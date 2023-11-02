<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResumeRequest;
use App\Http\Requests\StatusResumeRequest;
use App\Models\Education;
use App\Models\Resume;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use UnderflowException;

class ResumeController extends Controller
{
    public function index()
    {
        return response()->json([
            'items' => Resume::all()
        ], Response::HTTP_OK);
    }

    public function show(int $id)
    {
        return response()->json(
            Resume::where('id', $id)->first(),
            Response::HTTP_OK
        );
    }

    public function store(ResumeRequest $request)
    {
        $data = $request->validated();
        unset($data['education']);

        $resume = Resume::create($data);

        $educations = [];

        foreach($request->education as $education)
        {
            $educations[] = Education::create(
                array_merge($education, ['resume_id' => $resume->id])
            );
        }

        return response()->json(
            array_merge($resume, ['education' => $educations]),
            Response::HTTP_CREATED
        );
    }

    public function edit(ResumeRequest $request)
    {
        $data = $request->validated();
        unset($data['education']);

        $resume = Resume::find($request->id);
        unset($data['id']);
        $resume->update($data);

        $educations = [];

        foreach($request->education as $education)
        {
            if($education->id) 
            {
                $edu = Education::find($education['id']);
                unset($education['id']);
                $edu->update($education);
                $educations[] = $edu;
            } else {
                $educations[] = Education::create(
                    array_merge($education, ['resume_id' => $resume->id])
                );
            }
            
        }

        return response()->json(
            array_merge($resume, ['education' => $educations]),
            Response::HTTP_CREATED
        );
    }

    public function editStatus(StatusResumeRequest $request)
    {
        $resume = Resume::find($request->id);
        $resume->update([
            'status' => $request->status
        ]);
    }
}

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
    public function list()
    {
        return response()->json([
            'items' => Resume::all()
        ], Response::HTTP_OK);
    }

    public function detail(int $id)
    {
        return response()->json(
            Resume::where('id', $id)->with('education')->first(),
            Response::HTTP_OK
        );
    }

    public function store(ResumeRequest $request)
    {
        $data = $request->validated();
        unset($data['education']);

        // TODO сохранение в стор фотки

        $resume = Resume::create($data);

        $educations = [];

        foreach($request->education as $education)
        {
            $educations[] = Education::create(
                array_merge($education, ['resume_id' => $resume->id])
            );
        }

        return response()->json(
            array_merge($resume->toArray(), ['education' => $educations]),
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
            if(!empty($education['flag_delete'])) {
                $edu = Education::find($education['id']);
                $edu->delete();
            }
            else if(!empty($education['id'])) 
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
            array_merge($resume->toArray(), ['education' => $educations]),
            Response::HTTP_CREATED
        );
    }

    public function updateStatus(StatusResumeRequest $request)
    {
        $resume = Resume::find($request->id);
        $resume->update([
            'status' => $request->status
        ]);
        return response()->json(
            $resume->toArray(),
            Response::HTTP_OK
        );
    }
}

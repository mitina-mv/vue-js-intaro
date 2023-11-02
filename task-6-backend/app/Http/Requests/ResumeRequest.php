<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResumeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['nullable', 'exists:resumes,id'],
            'work_schedule' => ['required', 'in:full,flexible,shift,remote,watch'],
            'profession' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'photo' => ['required', 'file'],
            'full_name' => ['required', 'string', 'max:255'],
            'phone' => ['required','regex:/^([0-9\s\-\+\(\)]*)$/', 'min:10'],
            'email' => ['required', 'email'],
            'birthdate' => ['required', 'date'],
            'salary' => ['required', 'numeric'],
            'skills' => ['required', 'array'],
            'about' => ['required'],

            'education' => ['required', 'array', 'min:1'],
            'education.*.id' => ['nullable', 'exists:education,id'],
            'education.*.level' => ['required', 'in:middle,middleSpec,semiHigh,universe'],
            'education.*.institution' => ['required', 'string', 'max:255'],
            'education.*.faculty' => ['required', 'string', 'max:255'],
            'education.*.specialization' => ['required', 'string', 'max:255'],
            'education.*.end_year' => ['required', 'integer', 'min:1950', 'max:'.date('Y')],
        ];
    }

    public function messages()
    {
        return [
            '*.required' => 'Поле ":attribute" обязательно к заполнению!',
            '*.in' => 'Выбрано недопустимое значение!',
            '*.regex' => 'Не соотвествует маске!',
            '*.email' => 'Необходимо ввести адрес электронной почты!',
            '*.exists' => 'Невозможно отредактировать это резюме!',
            'education.*.end_year.min' => 'Указан недостимый год!',
            'education.*.end_year.max' => 'Указан недостимый год!',
        ];
    }

    public function attributes()
    {
        return [
            'email' => 'Еmail',
            'profession' => 'Профессия',
            'city' => 'Город',
            'photo' => 'Фото',
            'full_name' => 'Полное имя',
            'phone' => 'Телефон',
            'birthdate' => 'Дата рождения',
            'salary' => 'Желаемая зарплата',
            'skills' => 'Ключевые навыки',
            'work_schedule' => 'График работы',
            'about' => 'Обо мне',
            'education.*.level' => 'Уровень образования',
            'education.*.institution' => 'Учебное заведение',
            'education.*.faculty' => 'Факультет',
            'education.*.specialization' => 'Специализация',
            'education.*.end_year' => 'Год окончания',
        ];
    }
}

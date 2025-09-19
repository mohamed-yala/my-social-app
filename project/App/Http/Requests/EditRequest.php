<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditRequest extends FormRequest
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
            'name'=>'required|string',
<<<<<<< HEAD
            'ppicture'=>'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
=======
            'pPicture'=>'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
            'bio'=>'nullable|string',
            'visibility'=>'required|string'
        ];
    }
}

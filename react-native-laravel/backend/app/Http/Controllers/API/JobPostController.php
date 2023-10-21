<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\JobPost;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class JobPostController extends Controller
{
    public function alljobs()
    {
        $jobpost = JobPost::orderBy('postedAt', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'jobpost' => $jobpost,
        ]);
    }

    public function details($id)
    {
        $jobpost = JobPost::find($id);

        if ($jobpost) {
            return response()->json([
                'status' => 200,
                'jobpost' => $jobpost
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "No Job Post Found"
            ]);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'salary' => 'required|numeric|min:0',
            'company' => 'required|string|max:255',
            'postedAt' => ['required', 'date', 'date_format:d-m-Y']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ]);
        } else {

            $jobpost = new JobPost;
            $user = Auth::user();
            $userId = $user->id;
            $jobpost->title = $request->input('title');
            $jobpost->description = $request->input('description');
            $jobpost->salary = $request->input('salary');
            $jobpost->company = $request->input('company');
            $jobpost->postedAt = \DateTime::createFromFormat('d-m-Y', $request->input('postedAt'))->format('Y-m-d');
            $jobpost->user_id = $userId;
            $jobpost->save();
            return response()->json([
                'status' => 200,
                'jobpost' => $jobpost,
                'message' => 'JobPost Created Successfully'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'salary' => 'required|numeric|min:0',
            'company' => 'required|string|max:255',
            'postedAt' => ['required', 'date', 'date_format:Y-m-d']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
            ]);
        } else {

            $jobpost =  JobPost::find($id);
            $user = Auth::user();
            $user_id = $user->id;
            $jobpost_userId = $jobpost->user_id;

            if ($user_id !== $jobpost_userId) {
                return response()->json([
                    'status' => 403,
                    'message' => 'Not Authorised'
                ]);
            } else {
                if ($jobpost) {

                    $jobpost->title = $request->input('title');
                    $jobpost->description = $request->input('description');
                    $jobpost->salary = $request->input('salary');
                    $jobpost->company = $request->input('company');
                    // $jobpost->postedAt = \DateTime::createFromFormat('d-m-Y', $request->input('postedAt'))->format('Y-m-d');
                    $jobpost->postedAt = $request->input('postedAt');
                    $jobpost->save();
                    return response()->json([
                        'status' => 200,
                        'message' => 'JobPost Updated Successfully'
                    ]);
                } else {
                    return response()->json([
                        'status' => 404,
                        'message' => 'No JobPost ID Found'
                    ]);
                }
            }
        }
    }

    public function delete($id)
    {
        $jobpost = JobPost::find($id);
        $user = Auth::user();
        $user_id = $user->id;
        $jobpost_userId = $jobpost->user_id;


        if ($user_id !== $jobpost_userId) {
            return response()->json([
                'status' => 403,
                'message' => 'Not Authorised'
            ]);
        } else {

            if ($jobpost) {
                $jobpost->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'JobPost Deleted Successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No JobPost ID Found'
                ]);
            }
        }
    }
}

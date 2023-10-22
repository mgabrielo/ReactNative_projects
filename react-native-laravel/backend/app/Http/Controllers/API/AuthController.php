<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:7',
        ]);

        if ($validator->fails()) {
            $errors = implode("\n", $validator->errors()->all());
            return response()->json([
                'message' => $errors,
            ]);
        } else {
            $user = User::where('email', $request->email)->first();

            if ($user) {

                return response()->json([
                    'message' => 'User Already Exist',
                ]);
            } else {

                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                ]);

                return response()->json([
                    'status' => 200,
                    'user_id' => $user->id,
                    'username' => $user->name,
                    'email' => $user->email,
                ]);
            }
        }
    }

    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|max:191',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            $errors = implode("\n", $validator->errors()->all());
            return response()->json([
                'message' => $errors,
            ]);
        } else {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid Credentials',
                ]);
            } else {

                $token = $user->createToken($user->email . '_Token', [])->plainTextToken;
                return response()->json([
                    'status' => 200,
                    'user_id' => $user->id,
                    'username' => $user->name,
                    'email' => $user->email,
                    'token' => $token,
                ]);
            }
        }
    }


    public function logout(Request $request)
    {
        // $user = User::where('id', $request->email)->first();
        // $tokenId = PersonalAccessToken::where('id' , $request->id)->first();
        // $user->tokens()->where('id', $tokenId)->delete();

        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status' => 200,
        ]);
    }
}

<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    public function testRegister()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'password' => 'secret123',
        ];

        $response = $this->json('POST', '/api/register', $userData);
        $response->assertStatus(200);
        $response->assertJsonStructure(['status', 'user_id', 'username', 'email', 'message']);

        $response->assertJson([
            'status' => 200,
            'user_id' => 6,
            'username' => 'John Doe',
            'email' => 'johndoe@example.com',
            'message' => 'Registration Successful'
        ]);
    }


    public function testLogin()
    {
        $userData = [
            'email' => 'janedoe@example.com',
            'password' => 'secret123',
        ];

        $user = User::create([
            'name' => 'Jane Doe',
            'email' => $userData['email'],
            'password' => Hash::make($userData['password']),
        ]);

        $response = $this->json('POST', '/api/login', $userData);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 200,
                'user_id' => $user->id,
                'username' => 'Jane Doe',
                'email' => $userData['email'],
                'message' => 'Sign In Successful'
            ]);
    }

    public function testLogout()
    {
        $user = User::factory()->create();

        // Authenticate the user
        $token = $user->createToken('test-token')->plainTextToken;

        // Send a POST request to the '/api/logout' endpoint with the authentication token
        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->post('/api/logout');

        $response->assertStatus(200);
    }
}

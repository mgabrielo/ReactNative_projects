<?php

namespace Tests\Feature;

namespace Database\Factories;

use App\Models\JobPost;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class JobPostControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function testAllJobs()
    {
        $jobposts = JobPost::factory()->count(5)->create();

        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/api/jobs');

        $response->assertStatus(200);

        foreach ($jobposts as $jobpost) {
            $response->assertSee($jobpost->title);
            $response->assertSee($jobpost->description);
            $response->assertSee($jobpost->salary);
            $response->assertSee($jobpost->company);
            $response->assertSee((Carbon::createFromDate($jobpost->postedAt))->toDateString());
        }
    }


    public function testStoreJobPost()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->json('POST', '/api/jobs', [
            'title' => 'New Job',
            'description' => 'This is a New job post.',
            'salary' => 2500,
            'company' => 'New Company',
            'postedAt' => '20-10-2023', // Format should be d-m-Y
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 200,
            'message' => 'JobPost Created Successfully',
        ]);
        $response->assertJsonStructure([
            'status',
            'message',
            'jobpost' => [
                'id',
                'title',
                'description',
                'salary',
                'company',
                'postedAt',
                'user_id',
                'created_at',
                'updated_at',
            ],
        ]);
    }

    public function testDetailsRoute()
    {
        // Create a JobPost instance for testing
        $jobpost = JobPost::factory()->create();

        $user = User::factory()->create();
        // Hit the details route with the job post's ID
        $response = $this->actingAs($user)->get("/api/jobs/{$jobpost->id}");

        // Assert that the response status code is 200 (OK) if the job post exists
        $response->assertStatus(200);

        // If the job post exists, assert that the response contains the job post data
        $response->assertSee($jobpost->title);
        $response->assertSee($jobpost->description);
        $response->assertSee($jobpost->salary);
        $response->assertSee($jobpost->company);
        $response->assertSee((Carbon::createFromDate($jobpost->postedAt))->toDateString());
    }


    public function testUpdateJobPost()
    {
        // Create a user and authenticate
        $user = User::factory()->create();
        $this->actingAs($user);

        // Create a job post
        $jobPost = JobPost::factory()->create(['user_id' => $user->id]);

        // Define the updated data
        $updatedData = [
            'title' => 'Updated Title',
            'description' => 'Updated Description',
            'salary' => 3000,
            'company' => 'Updated Company',
            'postedAt' => '2023-10-20',
        ];

        // Send a PUT request to update the job post
        $response = $this->json('PUT', "/api/jobs/{$jobPost->id}", $updatedData);

        // Assert the response status code (e.g., 200 for success)
        $response->assertStatus(200);

        // Validate the response structure
        $response->assertJsonStructure(['status', 'jobpost', 'message']);

        // Assert the response contains the updated job post data
        $response->assertJson([
            'status' => 200,
            'message' => 'JobPost Updated Successfully',
            'jobpost' => [
                'id' => $jobPost->id,
                'title' => 'Updated Title',
                'description' => 'Updated Description',
                'salary' => 3000,
                'company' => 'Updated Company',
                'postedAt' => '2023-10-20',
                'user_id' => $user->id,
            ],
        ]);
    }
    public function testDeleteJobPost()
    {
        // Create a user
        $user = User::factory()->create();

        // Create a job post associated with the user
        $jobPost = JobPost::factory()->create(['user_id' => $user->id]);

        // Authenticate as the user
        $this->actingAs($user);

        // Make a DELETE request to the delete endpoint
        $response = $this->delete('/api/jobs/' . $jobPost->id);

        // Assert the response status code is 200 (success)
        $response->assertStatus(200);

        // Check if the job post is deleted
        $this->assertDatabaseMissing('jobposts', ['id' => $jobPost->id]);
    }
}

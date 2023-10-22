<?php

namespace Database\Factories;

use App\Models\JobPost;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobPostFactory extends Factory
{
    protected $model = JobPost::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'salary' => $this->faker->numberBetween(30000, 100000),
            'company' => $this->faker->company,
            'postedAt' => $this->faker->dateTimeThisDecade,
        ];
    }
}

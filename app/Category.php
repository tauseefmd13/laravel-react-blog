<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $appends = ['num_posts'];

    public function getNumPostsAttribute()
    {
        return $this->posts()->count();
    }

    public function posts()
    {
        return $this->hasMany(Post::class, 'category_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        "name",
        "slug",
        "price",
        "description",
        "isNew",
        "note",
        "quantity",
        "sub_category_id",
        "brand_id"     

    ];

    public function subCategory(): BelongsTo {
        return $this->belongsTo(SubCategory::class);
    }

    public function images(): HasMany {
        return $this->hasMany(ImageProduct::class);
    }

    public function tags(): BelongsToMany {
        return $this->belongsToMany(Tag::class, 'product_tag');
    }

    public function brand(): BelongsTo {
        return $this->belongsTo(Brand::class);
    }

    
}

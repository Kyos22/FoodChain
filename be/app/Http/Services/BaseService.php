<?php

namespace App\Http\Services;

class BaseService  {
    protected $model;


    public function __construct($model)
    {
        $this->model = $model;
    }

    public function getAll()
    {
        return $this->model::all();
    }

    public function find($id)
    {
        return $this->model::find($id);
    }

    public function create(array $data)
    {
        return $this->model::create($data);
    }

    public function update($id, array $data)
    {
        $item = $this->find($id);
        if ($item) {
            $item->update($data);
            return $item;
        }
        return null;
    }

    public function delete($id)
    {
        $item = $this->find($id);
        if ($item) {
            return $item->delete();
        }
        return false;
    }
}


?>
<?php

namespace App\Http\Livewire;

use App\Models\Juego;
use Livewire\Component;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\On;

class JuegoASumar extends Component
{
    public $estudianteA, $juego, $prueba;


    public function mount()
    {
        $this->juego = Juego::where('nombre', 'A Sumar')->first();
        $this->estudianteA = Auth::guard('estudiante')->user();
    }

    public function guardarPuntaje($puntaje)
    {
        $this->prueba = true;
        // guardar puntuacion
        $this->estudianteA->puntuacions()->create([
            'juego_id' => $this->juego->id,
            'puntos' => $puntaje,
        ]);
    }

    public function render()
    {
        return view('livewire.juego-a-sumar');
    }
}

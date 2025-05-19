<?php

return [
    'driver' => 'bcrypt',

    
    'argon' => [
        'memory' => 1024,
        'time' => 2,
        'threads' => 2,
    ],
    'bcrypt' => [
        'rounds' => 10,
    ],
];


?>
<?php

switch ($_SERVER["REQUEST_METHOD"]) {
    case 'GET':
        $result = $conn->query("SELECT * FROM auxdiassemana");
        $conn->close();

        //setar link de imagem
        if ($result->num_rows > 0) {
            $res["data"]["diasDaSemana"] = $result->fetch_all(MYSQLI_ASSOC);
        } else {
            $res["data"]["diasDaSemana"] = array();
        }
        echo json_encode($res);
        die;
        break;


}
?>
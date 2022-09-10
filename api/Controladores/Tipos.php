<?php

switch ($_SERVER["REQUEST_METHOD"]) {
    case 'GET':
        $result = $conn->query("SELECT * FROM auxtarefatipo WHERE auxtarefatipoStatus = 'A';");
        if ($result->num_rows > 0) {
            $res["cod"] = 200;
            $res["data"]["tipos"] = $result->fetch_all(MYSQLI_ASSOC);
        } else {
            $res["cod"] = 200;
            $res["data"]["tipos"] = array();
        }
        $conn->close();
        echo json_encode($res);
        die;
        break;
}

const baseDev = "http://localhost/api"
const baseProd = "http://julianoamasp/api"
const env = "desenvolvimento"
const BASEAPI = env == "producao" ? baseProd : baseDev

const request = new XMLHttpRequest();
export default {
    conn:function(metodo, url,){
        request.open(metodo, "http://localhost/api"+url, true);
        //request.setRequestHeader("Authorization", "Tarefas")

        return request;
    }
};

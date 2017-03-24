/**
 * Created by 54179 on 2017/3/21.
 */
import Renderer from "./renderer.js";
import $ from "jquery"

$('body').ready(function() {
    let canvas = $('#drawCanvas')[0];

    var renderer = new Renderer(canvas);

    Promise.all([
        readTextFile("./shader/vertexShader.vs"),
        readTextFile("./shader/fragmentShader.fs")
    ]).then(data => {
        let [vertexShader, fragmentShader] = data;

        renderer
        .initShaders(fragmentShader, vertexShader)
        .render();
    }, err => {
        console.log(err);
    });
 

    $('#fileInput').on('change', function(evt) {
        let file = evt.target.files[0];

        let reader = new FileReader();
        reader.onload = e => {
            let result = e.target.result;
            console.log(renderer);
            renderer.addMesh(result);
        };

        reader.readAsText(file);
    });
});

function readTextFile(file) {
    return new Promise((resolve, reject) => {
        _readTextFile(file, resolve);
    });
}

function _readTextFile(file, callback)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                callback(allText);
            }
        }
    }
    rawFile.send(null);
}

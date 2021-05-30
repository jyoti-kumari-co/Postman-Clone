console.log('this is project 6')
let parambox = document.getElementById('parambox');
parambox.style.display = "none";

let paramsRadio = document.getElementById('params');
paramsRadio.addEventListener('click', function () {
    document.getElementById('jsonbox').style.display = "none"
    parambox.style.display = "block";

})
let jsonRadio = document.getElementById('json');
jsonRadio.addEventListener('click', function () {
    document.getElementById('jsonbox').style.display = "block"

    document.getElementById('parambox').style.display = "none"
})

function getstring(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;

}
let count = 1;
let addparam = document.getElementById('addparam');
addparam.addEventListener('click', () => {
    let param = document.getElementById('moreparam');
    let string = ` <div class="row my-2">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${count + 1}</label>

                <div class="col-md-4">
                    <input type="text" placeholder="Enter parameter${count + 1} key" class="form-control" id="paramkey${count + 1}">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" placeholder="Enter parameter${count + 1} value" id="paramvalue${count + 1}">
                </div> <br>
                <button
            class="btn btn-primary delete" style="width: 37px;
            height: 36px;">-</button>
            </div>`;
    let paramElement = getstring(string);
    // console.log(paramElement)
    param.appendChild(paramElement);
    count++;
    let remove = document.getElementsByClassName('delete');
    // console.log(remove);
    for (item of remove) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }

})

let submit = document.getElementById('submitbtn');
submit.addEventListener('click', () => {
    let response = document.getElementById('response');
    response.value = "please wait..... feching api";
    let url = document.getElementById('url').value;
    console.log(url);
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    console.log(requestType);
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    if (contentType == 'params') {
        let obj = {};
        for (let i = 0; i < count; i++) {
            if (document.getElementById('paramkey' + (i + 1)) != undefined) {

                let key = document.getElementById('paramkey' + (i + 1)).value;
                let value = document.getElementById('paramvalue' + (i + 1)).value;
                obj[key] = value;
                // console.log(key,value)
                console.log(obj)
            }

        }
        obj = JSON.stringify(obj);
    }
    else {
        obj = document.getElementById('jsontext').value;
        console.log(obj)
    }



    if (requestType == 'GET') {
        fetch(document.getElementById('url').value
            , {
                method: 'GET',
            })
            .then(response => response.text())
            .then((text) => {
                let responset = document.getElementById('response');
                responset.innerHTML = text;
            })
    }
    else{
        fetch(document.getElementById('url').value
            , {
                method: 'POST',
                body : obj,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  },
            })
            .then(response => response.text())
            .then((text) => {
                let responset = document.getElementById('response');
                responset.innerHTML = text;
            })

    }
})
const input = document.querySelector('.input')
const button = document.querySelector('.button')
const showdiv = document.querySelector('.showdiv')

button.onclick = () => {
 
    let todoText = input.value;
    if (todoText != '') {
        saveinfo(todoText);
        displayinfo()
    }
    input.value = ''
}
const getData = (item = null) => {
    
    let data = JSON.parse(localStorage.getItem('task'));
    if (data) {
        if (item) {
            if (data.indexOf(item) != -1) {
                return data[item];
            } else {
                return false;
            }
        }
        return data;
    }
    return false;
}

function saveinfo(item) {

    if (getData(item) != false) {
        alert("Item already added in todo");
    } else {
        let data = getData();
        data = (data != false) ? data : [];
        data.push(item);
        localStorage.setItem('task', JSON.stringify(data));
    }
}

function displayinfo() {

    let li = ''
    let data = getData();
    if (data) {
        data.forEach((task, i) => {
            li += `
                    <tr>
                        <td class="w-8 px-4 py-2 font-medium text-gray-900">${(i > 8) ? i + 1 : "0" + (i + 1)}</td>
                        <td class=" px-4 py-2 text-gray-700">${task}</td>
                        <td class=" px-4 py-2">
                            <i onclick="edditData(${i})" class="fa-regular fa-pen-to-square inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"></i>
                            <i onclick="removeData(${i})" class="fa-solid fa-trash-can inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"></i>            
                        </td>
                        </tr>
            `
        })
    }
    showdiv.innerHTML = li;
}

displayinfo()
/* remove item from localstorage */

let removeData = (itemId) => {
    let data = getData();
    if (data) {
        let newData = data.filter((v, i) => { return i != itemId });
        localStorage.setItem('task', JSON.stringify(newData));
        displayinfo()
    } else {
        alert("no data found");
    }

}
const edditData = (itemId) => {
    const newTodoText = prompt("Edit your todo:");
    let data = getData();
    // let task = data.find((v, i) => { return i == itemId });
    data[itemId]=newTodoText
    localStorage.setItem('task', JSON.stringify(data));
    displayinfo()
}
// ECMAScript(ES) - ECMA's standard
// JavaScript - Programming language
// JS runtime 1 - chrome - 实现了XMLHttpRequest
// JS runtime 2 - node js
//准备做AJAX
function loadCourses(){
    // 1。使用xmlhttprequest 发送请求
    const xhr = new XMLHttpRequest();
    // 回调函数， 观测xhr的状态
    // 函数的引用
    xhr.onreadystatechange = handleStateChange;
    xhr.open("GET", "https://bba2652e-da95-4d56-9a93-28de4c427108.mock.pstmn.io/courses", true);
    xhr.send(/* request body*/);
    console.log("After xhr.send() called")
}

function handleStateChange() {
    console.log("State changed to" + this.readyState);
    // http status code-
    // 只关心成功拿到response的情况
    if(this.readyState === 4 && this.status === 200) {
        // check response body
        const courses = JSON.parse(this.responseText);
        renderCourses(courses);
        //console.log("Get Response body: " + this.responseText)
    }
}
function renderCourses(courses) {
    debugger;
    const courseRows = courses
        // change[{course}] -> [html String row]
        .map(course => convertToHtmlString(course)) 
        //change[html String row] -> cancat together
        .reduce((r1, r2) => r1+r2);
    document.getElementById("course-content").innerHTML = courseRows;


}
function convertToHtmlString(course) {
    let row = '<tr>';
    row += `<td>${course.courseName}</td>`;
    row += `<td>${course.courseContent}</td>`;
    row += `<td>${course.courseLocation}</td>`;
    row += `<td>${course.teacherId}</td>`;
    row += '</tr>';
    return row;
}
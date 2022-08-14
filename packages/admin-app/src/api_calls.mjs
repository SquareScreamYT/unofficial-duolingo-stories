//import {fetch_post} from "./includes.mjs";

let backend_get = "https://admin.duostories.org/get2"
let backend_set = "https://admin.duostories.org/set2"

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return undefined;
}

function setCookie(cname, cvalue, exdays) {
    if(!exdays) {
        document.cookie = cname + "=" + cvalue + ";"
        return;
    }
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function isLocalNetwork(hostname) {
    try {
        if (hostname === undefined)
            hostname = window.location.hostname;
        return (
            (['localhost', '127.0.0.1', '', '::1'].includes(hostname))
            || (hostname.startsWith('192.168.'))
            || (hostname.startsWith('10.0.'))
            || (hostname.endsWith('.local'))
        )
    }
    catch (e) {
        return true;
    }
}
//import {FormData} from "formdata-node"
//import fetch from "node-fetch";

let login_data = {username: getCookie("username"), password: getCookie("password")}
async function fetch_get(url) {
    if(!isLocalNetwork())
        return fetch(url);
    /** like fetch but with post instead of get */
    var fd = new FormData();
    //very simply, doesn't handle complete objects
    for(var i in login_data){
        if(login_data[i] !== undefined)
            fd.append(i,login_data[i]);
    }
    return fetch(url, {
        method: "POST",
        body: fd,
        mode: "cors"
    })
}


export async function fetch_post(url, data) {
    /** like fetch but with post instead of get */
    var fd = new FormData();
    //very simply, doesn't handle complete objects
    for(let i in login_data){
        fd.append(i,login_data[i]);
    }
    for(let i in data){
        fd.append(i,data[i]);
    }
    return fetch(url, {
        method: "POST",
        body: fd,
        mode: "cors"
    });
}

export async function getUserList() {
    try {
        let response_courses = await fetch_get(`${backend_get}/user_list`);
        return await response_courses.json();
    }
    catch (e) {
        return [];
    }
}

export async function getLanguageList() {
    try {
        let response_courses = await fetch_get(`${backend_get}/language_list`);
        return await response_courses.json();
    }
    catch (e) {
        return [];
    }
}

export async function getCourseList() {
    try {
        let response_courses = await fetch_get(`${backend_get}/course_list`);
        return await response_courses.json();
    }
    catch (e) {
        return [];
    }
}

export async function setLanguage(data) {
    try {
        let response = await fetch_post(`${backend_set}/language`, data);
        return response.text();
    }
    catch (e) {
        return [];
    }
}

export async function setCourse(data) {
    try {
        let response = await fetch_post(`${backend_set}/course`, data);
        return response.text();
    }
    catch (e) {
        return [];
    }
}

export async function setSyncFlag() {
    try {
        let response = await fetch_post(`${backend_set}/sync_flags`, {});
        return response.text();
    }
    catch (e) {
        return "error";
    }
}

export async function setSyncFrontendStories() {
    try {
        let response = await fetch_post(`${backend_set}/sync_stories`, {});
        return response.text();
    }
    catch (e) {
        return "error";
    }
}

export async function setSyncFrontendEditor() {
    try {
        let response = await fetch_post(`${backend_set}/sync_editor`, {});
        return response.text();
    }
    catch (e) {
        return "error";
    }
}

export async function setSyncVoiceList() {
    try {
        let response = await fetch_post(`${backend_set}/sync_voice_list`, {});
        return response.text();
    }
    catch (e) {
        return "error";
    }
}



export async function getCourses() {
    try {
        let response_courses = await fetch_get(`${backend_get}/courses`);
        return await response_courses.json();
    }
    catch (e) {
        return [];
    }
}

export async function getSession() {
    try {
        let response_courses = await fetch_get(`${backend_get}/session`);
        return await response_courses.json();
    }
    catch (e) {
        return undefined;
    }
}

export async function login(data) {
    // currenty only store the local cookies for local test
    if(isLocalNetwork()) {
        login_data = data;
        setCookie("username", data["username"])
        setCookie("password", data["password"])
    }
    // check if the user is logged in
    let reponse = await fetch_post(`${backend_get}/login`, data);
    return reponse.status !== 403;

}

export async function getCourse(id) {
    if(!id)
        return {}
    try {
        let response = await fetch_get(`${backend_get}/course?id=${id}`);
        return await response.json();
    }
    catch (e) {
        return {};
    }
}

export async function getAvatars(id) {
    try {
        let response = await fetch_get(`${backend_get}/avatar_names?id=${id}`);
        return await response.json();
    }
    catch (e) {
        return {};
    }
}

export async function getSpeakers(id) {
    try {
        let response = await fetch_get(`${backend_get}/speakers?id=${id}`);
        return await response.json();
    }
    catch (e) {
        return {};
    }
}

export async function getLanguageName(id) {
    try {
        let response = await fetch_get(`${backend_get}/language?id=${id}`);
        return await response.json();
    }
    catch (e) {
        return {};
    }
}

export async function setUserActivated(data) {
    try {
        let response = await fetch_post(`${backend_set}/user_activate`, data);
        return await parseInt(response.text());
    }
    catch (e) {
        return undefined;
    }
}

export async function setUserWrite(data) {
    try {
        let response = await fetch_post(`${backend_set}/user_write`, data);
        return await parseInt(response.text());
    }
    catch (e) {
        return undefined;
    }
}

export async function setAvatarSpeaker(data) {
    try {
        let response = await fetch_post(`${backend_set}/avatar`, data);
        return await response.json();
    }
    catch (e) {
        return {};
    }
}

export async function setStatus(data) {
    try {
        let response = await fetch_post(`${backend_set}/status`, data);
        return await response.json();
    }
    catch (e) {
        return {};
    }
}

export async function setApproval(data) {
    try {
        let response = await fetch_post(`${backend_set}/approve`, data);
        return await response.text();
    }
    catch (e) {
        return undefined;
    }
}


export async function getStory(id) {
    let response_json = await fetch_get(`${backend_get}/story?id=${id}`);
    return response_json.json();
}
export async function getAvatar(id) {
    try {
        let response_json = await fetch_get(`${backend_get}/avatar?id=${id}`);
        return response_json.json();
    }
    catch (e) {
        return {};
    }
}

let images_cached = {};
export function getImage(id) {
    if(images_cached[id] !== undefined) {
        return images_cached[id];
    }
    getImageAsync(id)
    return {}
}

export async function getImageAsync(id) {
    try {
        let response_json = await fetch_get(`${backend_get}/image?id=${id}`);
        let image = await response_json.json();
        images_cached[id] = image;
        return image;
    }
    catch (e) {
        return {};
    }
}

export async function getImportList(id, id2) {
    let response_json = await fetch_get(`${backend_get}/import?id=${id}&id2=${id2}`);
    return response_json.json();
}

export async function setImport(id, course_id) {
    let response_json = await fetch_get(`${backend_set}/import?id=${id}&course_id=${course_id}`);
    return response_json.text();
}

export async function setStory(data) {
    let res = await fetch_post(`${backend_set}/story`, data);
    res = await res.text()
    return res;
}

export async function deleteStory(data) {
    let res = await fetch_post(`${backend_set}/story_delete`, data);
    res = await res.text()
    return res;
}



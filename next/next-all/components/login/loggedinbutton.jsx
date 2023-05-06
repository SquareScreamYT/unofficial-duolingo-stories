import styles from "./loggedinbutton.module.css"
import React, {useEffect, useState} from "react";
import Dropdown from "../layout/dropdown";
import {signOut, useSession} from "next-auth/react";


function useDarkLight() {
    const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme);
    const inactiveTheme = activeTheme === "light" ? "dark" : "light";
    //...

    useEffect(() => {
        document.body.dataset.theme = activeTheme;
        window.localStorage.setItem("theme", activeTheme);
    }, [activeTheme]);

    return {set: setActiveTheme, toggle: () => setActiveTheme(inactiveTheme), value: activeTheme}
}

export default function LoggedInButton({page, course_id}) {
    const { data: session } = useSession();
    const controls = useDarkLight();

    let editor_link = "/editor"
    if(course_id)
        editor_link = "/editor/course/"+course_id
    let stories_link = "/"
    if(course_id)
        stories_link = "/"+course_id

    if(session === undefined)
        return <></>
    return <Dropdown>
        <div className={styles.round} style={{ backgroundImage: `url('${session.user?.image}')` }}>{session.user.name.substring(0, 1)}</div>
        <div>
            <div id="button_editor" className={styles.profile_dropdown_button} onClick={()=>{window.location.href = "/profile"}}>
                Profile
            </div>
            {<div id="button_editor" className={styles.profile_dropdown_button + "  button_dark_mode"} onClick={() => {
                controls.toggle()
            }}>
                {controls.value === "light" ? "Dark Mode" : "Light Mode"}
            </div>}
            {session.user?.role && page !== "stories" ?
                <div id="button_editor" className={styles.profile_dropdown_button} onClick={()=>{window.location.href = stories_link}}>
                    Stories
                </div> : null}
            {session.user?.role && page !== "editor" ?
                <div id="button_editor" className={styles.profile_dropdown_button} onClick={()=>{window.location.href = editor_link}}>
                    Editor
                </div> : null}
            {session.user?.admin && page !== "admin" ?
                <div id="button_editor" className={styles.profile_dropdown_button} onClick={()=>{window.location.href = "/admin"}}>
                    Admin
                </div> : null}
            <div className={styles.profile_dropdown_button} onClick={() => signOut()} >Log out</div>
        </div>
    </Dropdown>
}
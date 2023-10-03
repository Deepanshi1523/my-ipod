import React from "react";
import Menu from "./Menu";
import Allsongs from "./Allsongs";

//functional display component to render display in ipod
const Display=(props)=>{
    //unpacking props
    const{menu,screen,songsList,updateProgress,progressRef,theme}=props;
    const{wallpaper,screenIndex}=screen;

    //changing ipod display theme color
    const themeDisplay=()=>{
        if(theme.themeIndex === 0){
            return { background: "linear-gradient(90deg, #e3e4e5,#cacaca)"};
        } else{
            return { backgroundColor: "black" };
        }
    };

    return (
        <div className="display" style={themeDisplay()}>
            {screenIndex===7 && (
                <Allsongs
                    songsList={songsList}
                    updateProgress={updateProgress}
                    progressRef={progressRef}
                />
            )}
            {screenIndex!==7 &&(
                <img
                    src={wallpaper[screenIndex]}
                    alt="Display Screen"
                    style={{
                        height:"100%",
                        width:"100%",
                        borderTopLeftRadius:"11px",
                        borderTopRightRadius:"11px",
                        borderBottomRightRadius:"11px",
                        borderBottomLeftRadius:"11px",
                        zIndex:2
                    }}
                />
            )}
            <Menu menu={menu}/>
        </div>
    );   
}

export default Display;
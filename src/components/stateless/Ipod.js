import React from "react";
import Display from "./Display";
import Controller from "./Controller";

const Ipod = (props)=>{
    const{
        menu,
        screen,
        rotate,
        tap,
        isMenuVisible,
        addClass,
        removeClass,
        mouse,
        controllerRef,
        songsList,
        play,
        nextSong,
        prevSong,
        updateProgress,
        progressRef,
        theme,
    }=props;
    //changing ipod bottom container theme color
    const themeBottomContainer=()=>{
        if(theme.themeIndex===0){
            return{
                background: "linear-gradient(90deg, #e3e4e5, #cacaca)",
                transition: "all 2s linear",
            };
        }
        else{
            return{
                background:"#df7474",
                transition:"all 2s linear"
            };
        }
    };

    //changing ipod top container theme color
    const themeTopContainer=()=>{
        if(theme.themeIndex===0){
            return{
                background: "linear-gradient(90deg, #e3e4e5, #cacaca)"
            };
        }
         else{
            return{
                background:"#df7474"
            };
        }
    };

    //changing ipod display container theme color
    const themeDisplayContainer=()=>{
        if(theme.themeIndex===0){
            return{
                background: "linear-gradient(90deg, #e3e4e5, #cacaca)"
            };
        }
        else{
            return{
                background:"#df7474"
            };
        }
    };

    //changing ipod theme shadow
    const themeIpod =()=>{
        if(theme.themeIndex===0){
            return{
                background: "linear-gradient(90deg, #e3e4e5, #cacaca)",
                boxShadow:"1px 4px 15px 10px rgba(151,151,151,0,72)"
            };
        }
        else{
            return{
                background:"#df7474",
                boxShadow:"0px 1px 15px 13px rgba(151,151,151,0,72)"
            };
        }
    };

    return(
        <div className="ipod" style={themeIpod()}>
            <div
                className="top-container"
                style={themeTopContainer()}
                onMouseUp={(e)=>{
                    e.stopPropagation();
                    removeClass("inner-circle", "down");
                    return;
                }}
            >
                <div className="display-container" style={themeDisplayContainer()}>
                    <Display
                        menu={menu}
                        screen={screen}
                        songsList={songsList}
                        theme={theme}
                        updateProgress={updateProgress}
                        progressRef={progressRef}
                    />
                </div>
            </div>
            <div className="bottom-container" style={themeBottomContainer()}>
                <Controller
                    menu={menu}
                    rotate={rotate}
                    tap={tap}
                    isMenuVisible={isMenuVisible}
                    addClass={addClass}
                    removeClass={removeClass}
                    mouse={mouse}
                    screen={screen}
                    controllerRef={controllerRef}
                    songsList={songsList}
                    theme={theme}
                    play={play}
                    nextSong={nextSong}
                    prevSong={prevSong}
                />
            </div>
        </div>
    );
}

export default Ipod;
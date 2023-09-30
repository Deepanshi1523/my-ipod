import React from "react";

const Menu=(props)=>{
    const {menu}=props;
    const{
        optionsIndex,
        musicIndex,
        settingsIndex,
        options,
        musicVisible,
        menuVisible,
        settingsVisible
    }=menu;
    let show="No show available";
    let menuArray, musicArray, settingsArray, value;
    if(menuVisible==="yes"){
        show="menu";
        menuArray=options.map((object)=>{
            const temp=Object.keys(object);
            return temp[0];
        });
        const val=menuArray[optionsIndex];
        value=val;
    }
    if(menuVisible==="yes"){
        show="music";
        musicArray=options[optionsIndex].music;
        const val=musicArray[musicIndex];
        value=val;
    }
    if(settingsVisible==="yes"){
        show="settings";
        settingsArray=options[optionsIndex].settings;
        const val=settingsArray[settingsIndex];
        value=val;
    }
    const divStyling = (item)=>{
        if(value==item){
            return {backgroundColor: "cyan"};
        }else return {};
    };
    const imgStyling = (item) =>{
        if(value===item){
            return {display: "initial"};
        } return {};
    };
    let RenderMenu = "Will be rendered soon";
    if(show==="menu"){
        RenderMenu=menuArray.map((item)=>{
            return(
                <div className={item} style={divStyling(item)} id="options">
                    <p style={styles.text}>{item}</p>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/81/81068.png"
                        alt="select"
                        style={imgStyling(item)}
                    />
                </div>
            );
        });
    }else if(show==="music"){
        RenderMenu=musicArray.map((item)=>{
            <div className={item} style={divStyling(item)} id="options">
                <p style={styles.text}>{item}</p>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/81/81068.png"
                    alt="select"
                    style={imgStyling(item)}
                />
            </div>
        });
    }
    else if(show==="settings"){
        RenderMenu=settingsArray.map((item)=>{
            <div className={item} style={divStyling(item)} id="options">
                <p style={styles.text}>{item.replace("-"," ")}</p>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/81/81068.png"
                    alt="select"
                    style={imgStyling(item)}
                />
            </div>
        })
    }
    return (
        <div
            className={menuVisible==="no"? "menu hide" : "menu"}
            style={styles.menu}
        >
            <div className="ipod-title" style={styles.title}>
                <p style={{borderRadiusTopLeft:"10%"}}>Mini Ipod App</p>
            </div>
            {RenderMenu}
        </div>
    );
};
const styles={
    title: {
		fontSize: "1.3rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textShadow: "1px 2px 0px lightgray",
	},
	text: {
		marginLeft: "1rem",
		textTransform: "capitalize",
	},
	menu: {
		backgroundColor: "lightcyan",
		borderTopLeftRadius: "11px",
        borderBottomLeftRadius: "11px",
	},
};
export default Menu;
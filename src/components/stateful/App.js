import React from "react";
import Ipod from "../stateless/Ipod";
//ZingTouch is built to make implementing gestures for the browser as easy or complex as you need it to be.
import ZingTouch from "zingtouch";
//React Helmet is a component which lets you control your document head using their React component. 
import Helmet from "react-helmet";
//importing images from assets
import images from "../../assets/images/images";
//importing songs and thumbnails
import songs from "../../assets/songs/songs";

//stateful app class component to render app as a whole
class App extends React.Component{
    //constructor for initialisation of state and ref
    constructor(){
        super();
        //state 
        const song1=new Audio(songs.music1);
        const song2=new Audio(songs.music2);
        const song3=new Audio(songs.music3);
        this.state={
            //state managing the menu
            menu:{
                //menu options along with their sub-menu options
                options:[
                    {
                        music:["all-songs", "artists", "albums"],
                    },
                    {
                        games:[],
                    },
                    {
                        coverflow:[],
                    },
                    {
                        settings:[
                            "change-wallpaper",
                            "change-orientation",
                            "change-theme",
                        ],
                    },
                ],
                //making menu visible
                menuVisible:"no",
                musicVisible:"no",
                settingsVisible:"no",
                //menu options index for traversal in options and sub options 
                optionsIndex:0,
                musicIndex:0,
                settingsIndex:0,
                //used for main page rendering like songs, artists, albums
                pageRender:"no",
            },
            //state managing screen display
            screen:{
                //list wallpapers, pages in background to render
                wallpaper:[
                    //wallpaper
                    images.wallpaper1,
                    images.wallpaper2,
                    images.wallpaper3,
                    images.wallpaper4,
                    images.wallpaper5,
                    //coverflow
                    images.coverflow,
                    //games
                    images.games,
                    //all songs
                    images.allsongs,
                    //artists
                    images.artists,
                    //albums
                    images.albums
                ],
                //wallpaper index for traversal in wallpaper array to access wallpaper
                wallpaperIndex:0,
                //wallpaper index for traversal in wallpaper array for every screen
                screenIndex:0,
            },
            //state managing mouse click css effect
            mouse:{
                innerCircle:"",
            },
            //state managing songs
            songsList:{
                songs:[song1,song2,song3],
                thumbnails:[images.song1Img,images.song2Img,images.song3Img],
                songIndex:0,
                name:["Stay", "Deserve You", "Yummy"],
                isPlaying: false,
            },
            //state managing themes
            theme:{
                themeList:["Classic", "Dark"],
                themeIndex:0,
            }
        };
        //reference to access the component
        this.controllerRef=React.createRef();
        this.progressRef=React.createRef();
    }

    //functionality to choose menu to display and handle menu clicks 
    isMenuVisible=(menu,screen)=>{
        const {songsList}=this.state;
        //to go back to the previous menu from the current display
        if(menu.pageRender==="yes"){
            menu.menuVisible="yes";
            screen.screenIndex=screen.wallpaperIndex;
            menu.pageRender="no";
            songsList.songs.map((song)=>{
                song.pause();
                song.currentTime=0;
                return [];
            });
            songsList.isPlaying=false;
        }
        //to open menu and visit different menu options
        else{
            if(
                menu.menuVisible==="yes"&&
                menu.musicVisible==="no"&&
                menu.settingsVisible==="no"
            ){
                menu.menuVisible="no";
            } else if(
                menu.menuVisible==="yes"&&
                menu.musicVisible==="yes"&&
                menu.settingsVisible==="no"
            ){
                menu.musicVisible="no";
            } else if(
                menu.menuVisible==="yes"&&
                menu.musicVisible==="no"&&
                menu.settingsVisible==="yes"
            ){
                menu.settingsVisible="no";
            } else{
                menu.menuVisible="yes";
            }
        }
        this.setState({menu,screen,songsList});
        return;
    };

    //functionality to handle down press css effect on middle button
    addClass=(classname,event)=>{
        if(classname==="inner-circle" && event ==="down"){
            const{mouse}=this.state;
            mouse.innerCircle="down";
            this.setState({mouse});
        }
    };

    //functionality to handle up press css effect on middle button
    removeClass=(classname,event)=>{
        if(classname==="inner-circle" && event==="down"){
            const {mouse} = this.state;
            mouse.innerCircle="";
            this.setState({mouse});
        }
    }

    //functionality to handle click operations in the app for displays
    tap=(menu,screen)=>{
        const{songsList,theme}=this.state;
        //to go to the sub menu of the main menu
        if(
            menu.menuVisible==="yes" &&
            menu.musicVisible==="no" &&
            menu.settingsVisible==="no"
        ){
            if(menu.optionsIndex===0){
                menu.musicVisible="yes";
            }else if(menu.optionsIndex===1){
                menu.pageRender="yes";
                menu.menuVisible="no";
                screen.screenIndex=6;
            }else if(menu.optionsIndex===2){
                menu.pageRender="yes";
                menu.menuVisible="no";
                screen.screenIndex=5;
            }else{
                menu.settingsVisible="yes";
            }
        }
        //to open pages of music menu
        else if(
            menu.menuVisible==="yes" &&
            menu.musicVisible==="yes" &&
            menu.settingsVisible==="no"
        ){
            if(menu.musicIndex===0){
                menu.pageRender="yes";
                menu.menuVisible="no";
                screen.screenIndex=7;
                songsList.isPlaying=true;
                songsList.songs[songsList.songIndex].play();
            }else if(menu.musicIndex===1){
                menu.pageRender="yes";
                menu.menuVisible="no";
                screen.screenIndex=8;
            }else{
                menu.pageRender="yes";
                menu.menuVisible="no";
                screen.screenIndex=9;
            }
        }
        //to open pages of settings menu
        else if(
            menu.menuVisible==="yes" &&
            menu.musicVisible==="no" &&
            menu.settingsVisible==="yes"
        ){
            if(menu.settingsIndex===0){
                if(screen.wallpaperIndex<4){
                    screen.wallpaperIndex+=1;
                }else{
                    screen.wallpaperIndex=0;
                }
                screen.screenIndex=screen.wallpaperIndex;
            }
            //for changing the orientation
            else if(menu.settingsIndex===1){
                alert("Feature Will Be Added in the Next Version Release !! :");
            }
            //for changing theme
            else{
                if(theme.themeIndex===0){
                    theme.themeIndex=1;
                }else{
                    theme.themeIndex=0;
                }
            }
        }else{}
        this.setState({menu,screen,songsList,theme});
    };

    rotate=(menu)=>{
        //binds rotate event to active region
        this.activeRegionOuter.bind(
            this.containerElementOuter,
            "rotate",
            (event)=>{
                event.stopPropagation();
                //rotation in main menu
                if(
                    menu.menuVisible==="yes" &&
                    menu.musicVisible==="no" &&
                    menu.settingsVisible==="no"
                ){
                    const angle=event.detail.angle;
                    if(angle>=0 && angle<=90){
                        menu.optionsIndex=0;
                    }else if(angle>90 && angle<=180){
                        menu.optionsIndex=1;
                    }else if(angle>180 && angle<=270){
                        menu.optionsIndex=2;
                    }else if(angle>270 && angle<=360){
                        menu.optionsIndex=3;
                    }else if(angle>=-90 && angle<0){
                        menu.optionsIndex=3;
                    }else if(angle>=-180 && angle<-90){
                        menu.optionsIndex=2;
                    }else if(angle>=270 && angle<-180){
                        menu.optionsIndex=1;
                    }else if(angle>=-360 && angle<-270){
                        menu.optionsIndex=0;
                    }else{}
                }
                //rotation in music menu
                else if(
                    menu.menuVisible==="yes" &&
                    menu.musicVisible==="yes" &&
                    menu.settingsVisible==="no"
                ){
                    const angle = event.detail.angle;
                    if(angle>=0 && angle<=120){
                        menu.musicIndex=0;
                    }else if(angle>120 && angle<=240){
                        menu.musicIndex=1;
                    }else if(angle>240 && angle<=360){
                        menu.musicIndex=2;
                    }else if(angle<0 && angle>=-120){
                        menu.musicIndex=2;
                    }else if(angle>=-240 && angle<-120){
                        menu.musicIndex=1;
                    }else if(angle>=-360 && angle<-240){
                        menu.musicIndex=0;
                    }else {}
                }
                //rotation in settings menu
                else if(
                    menu.menuVisible==="yes" &&
                    menu.musicVisible==="no" &&
                    menu.settingsVisible==="yes"
                ){
                    const angle = event.detail.angle;
                    if(angle>=0 && angle<=120){
                        menu.settingsIndex=0;
                    }else if(angle>120 && angle<=240){
                        menu.settingsIndex=1;
                    }else if(angle>240 && angle<=360){
                        menu.settingsIndex=2;
                    }else if(angle>=-120 && angle<0){
                        menu.settingsIndex=2;
                    }else if(angle>=-240 && angle<-120){
                        menu.settingsIndex=1;
                    }else if(angle>=-360 && angle<-240){
                        menu.settingsIndex=0;
                    }else {}
                }else {}
                this.setState({menu});
            }
        );
    };

    //gets called before first re-render and uses reference to controller 
    componentDidMount(){
        this.containerElementOuter=this.controllerRef.current;
        this.activeRegionOuter=new ZingTouch.Region(this.containerElementOuter);
    }

    //gets called when we press play/pause button to play-pause song
    play=(songsList)=>{
        if(
            this.state.menu.pageRender==="yes" &&
            this.state.screen.screenIndex===7
        ){
            const {songIndex}=songsList;
            if(songsList.isPlaying){
                songsList.isPlaying=false;
                songsList.songs[songIndex].pause();
            }else {
                songsList.isPlaying=true;
                songsList.songs[songIndex].play();
            }
            this.setState({songsList});
        }else {}
    };

    //gets called when we press next button for next song
    nextSong =(songsList)=>{
        if(
            this.state.menu.pageRender==="yes" &&
            this.state.screen.screenIndex===7
        ){
            songsList.songs.map((song)=>{
                song.pause();
                song.currentTime=0;
                return [];
            });
            songsList.isPlaying=false;
            songsList.songIndex+=1;
            if(songsList.songIndex>songsList.songs.length-1){
                songsList.songIndex=0;
            }
            songsList.songs[songsList.songIndex].play();
            songsList.isPlaying=true;
            this.setState({songsList});
        }else {}
    };

    //gets called when we press the previous button for previous song
    prevSong =(songsList)=>{
        if(
            this.state.menu.pageRender==="yes" &&
            this.state.screen.screenIndex===7
        ){
            songsList.songs.map((song)=>{
                song.pause();
                song.currentTime=0;
                return [];
            });
            songsList.isPlaying=false;
            songsList.songIndex-=1;
            if(songsList.songIndex<0){
                songsList.songIndex=songsList.songs.length-1;
            }
            songsList.songs[songsList.songIndex].play();
            songsList.isPlaying=true;
            this.setState({songsList});
        }else {}
    };

    //gets called to update song progress bar
    updateProgress=(event)=>{
        if(
            this.state.menu.pageRender==="yes" &&
            this.state.screen.screenIndex===7
        ){
            const {currentTime, duration} =event.srcElement;
            const progressPercent = (currentTime/duration) *100;
            this.progressRef.current.style.width=progressPercent+"%";
        }else {}
    };

    //renders app component
    render(){
        //unpacking state
        const {menu,screen,mouse,songsList, theme}=this.state;
        //changing application body theme
        const styling = ()=>{
            if(theme.themeIndex===0){
                return "background-color: ''; transition: all 2s linear";
            }else{
                return "background-color: black; transition: all 2s linear";
            }
        };
        return(
            <div>
                <Ipod
                    screen={screen}
                    menu={menu}
                    mouse={mouse}
                    songsList={songsList}
                    theme={theme}
                    isMenuVisible={this.isMenuVisible}
                    addClass={this.addClass}
                    removeClass={this.removeClass}
                    tap={this.tap}
                    rotate={this.rotate}
                    play={this.play}
                    nextSong={this.nextSong}
                    prevSong={this.prevSong}
                    updateProgress={this.updateProgress}
                    controllerRef={this.controllerRef}
                    progressRef={this.progressRef}
                />
                <Helmet>
                    <style>{`body {${styling()}}`}</style>
                </Helmet>
            </div>
        );
    }
}

export default App;
import axios from 'axios';
import Swal from 'sweetalert2';

export const signInWithGoogle = async(firebase,auth) =>{
    const  provider = new firebase.signAuth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    handleNewOldUser(provider,firebase,auth);
}

export const signInWithGithub = async(firebase,auth) =>{
    const provider = new firebase.signAuth.GithubAuthProvider();    
    handleNewOldUser(provider,firebase,auth);
}

const handleNewOldUser = async(provider,firebase,auth) =>{
    try{
        const data = await auth.signInWithPopup(provider);
        const {displayName, email, photoURL,uid} = data.user;
        
        const res = await axios.post('https://recode-snippet.herokuapp.com/profile',{
            name : displayName, 
            email : email, 
            picture : photoURL,
            uid : uid
        });
        
        // if the insertion fails,
        if(!res.data.message==='success'){
            firebase.doSignOut();
            return;
        }
        localStorage.setItem('userid',uid);
        
    }catch(err){
        firebase.doSignOut();
        localStorage.removeItem('userid');
        console.log("Error in index.js handle newold user "+err);
    }
}
export const signOut = (firebase) =>{
    Swal.fire({
        title:"Log out",
        icon:"question",
        text:"Do you want to log out?",
        confirmButtonText:"Sure",
        showCancelButton:true,
        cancelButtonText:"cancel",
        preConfirm:async()=>{
            await firebase.doSignOut();
            localStorage.removeItem('userid');
        },
        showLoaderOnConfirm:true
    })
}
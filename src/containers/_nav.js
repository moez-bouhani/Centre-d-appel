export default [{
  _name: 'CSidebarNav',
  _children: [
    
    
    //profile
   
    {
      _name: 'CSidebarNavItem',
      name: 'Profil',
      to: '/profile/client',
      icon: 'cil-user',
      beforeEnter: (to, from, next) => {
        if (store.state.loggedIn == false) next("/accueil");
        next();
      }




    },

 
   
    
  ]
}]
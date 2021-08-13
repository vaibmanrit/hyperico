
module.exports = {
    walkinMapper : (walkins,jobRoles,venues) =>{
        walkins.forEach(walkin =>{
            walkin['RoleName']=[];
            jobRoles.forEach(role =>{
                if(walkin.id === role.id){
                    walkin['RoleName'].push(role.RoleName);
                }
            })

            venues.forEach(venue =>{
                if(walkin.id === venue.id){
                    walkin['City']= venue.City;
                }
            })
        })
        return walkins;
    }
}
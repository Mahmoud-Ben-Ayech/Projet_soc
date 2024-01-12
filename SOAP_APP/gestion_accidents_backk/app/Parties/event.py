from flask import Flask,request,jsonify
from app.shared_functions import get_all_data
from app.configuration import table_user
from app import soap



event_table_name=['Event','twitter','userData']

@soap(namespace='EventService')
def add_event(titre, evenement, date):
    list_ids=table_user.distinct('_id')

    if len(list_ids) >= 1 : 
        last_id=max(list_ids)
    else :
        last_id=0    

    Titre=titre
    Evenement=evenement
    Date=date
    
    if Titre!='' and Evenement!='' and Date!='' :
        table_user.insert_one({'_id':last_id+1,'Titre':Titre,'Evenement':Evenement,'Date':Date})
        return jsonify({"succes":"addition successfully ! "}) , 200
    return jsonify({"error":"empty elements was detected !"}) 



@soap(namespace='EventService')
def get_all_events():
   return get_all_data(event_table_name)



if __name__ == '__main__':
    app.run(debug=True)


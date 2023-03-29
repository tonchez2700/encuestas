import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { general } from '../theme/customTheme'
import { ColorsG } from '../../constants/Colors'
import { Icon,  } from "react-native-elements";


const EmployedInfoScreen = ({ route })=>  {
    const { emp  } = route.params;
  return (
    <View style={general.container}>
      <Text style={{fontWeight: "bold", fontSize: 30, marginLeft: -5}}>{emp.user.name} {emp.user.paternal_surname}</Text> 
      <Text style={{fontSize: 18, marginLeft: -5}}>{emp.user.email}</Text>
      <Text style={{fontSize: 18, marginLeft: -5}}>{emp.company.name}</Text>
      <Text style={{fontSize: 22, marginTop: 10}}>Encuestas: </Text>

      <ScrollView>
        <View style={{marginTop: 10}}>
          {emp.applications.map((apcl) => (
            <View key={apcl.id} style={{flex: 1, borderWidth: 1, borderColor: ColorsG.gray, marginTop: 15, borderRadius: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <View>
                <Text style={{fontSize: 18, marginLeft: 5, marginTop: 4}}>{apcl.name}</Text>
                <Text style={{fontSize: 18, marginLeft: 5, fontSize: 15,}}>{apcl.questionnaire.description}</Text>
                <Text style={{fontSize: 18, marginLeft: 5, fontSize: 15, marginBottom: 4}}>
                  {apcl.is_active === 1 ? "Activo" : " Inactivo"}
                </Text>
              </View>
              <View style={{height: 35, width: 35, justifyContent: "center", borderWidth: 1, borderRadius: 5, marginRight: 10,}}>
                <TouchableOpacity style={{ flex: 1, backgroundColor: ColorsG.primary, justifyContent: "center"}}>
                  <Icon
                      size={18}
                      name="pencil"
                      type="font-awesome"
                      color={"white"}
                    />
                </TouchableOpacity>
              </View>
              
            </View>
          
        ))}
        </View>
        
      </ScrollView>
    </View>
  )
}

export default EmployedInfoScreen;
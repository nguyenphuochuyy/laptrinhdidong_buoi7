import { StatusBar } from 'expo-status-bar';
import {useState , useEffect} from "react"
import { Button, FlatList, StyleSheet, Text,View } from 'react-native';



const Item = ({items})=>{
  return(
    <View>
        <View style={styles.todoItem}>
        <Text>ID Công Việc : {items.id} </Text>
        <Text>Công Việc : {items.name} </Text>
        </View>
       
    </View>
  )
}
export default function App() {

  const handle = async () => {
    var todo = {

      name : "công việc 200"
    }
   const response = await fetch('https://645906864eb3f674df8478c5.mockapi.io/api/v1/todolist', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo)
  })

  const newTodo = await response.json()
  setData(preData => [...preData , newTodo]);
}
const handleEdit = async () => {
 const response = await fetch('https://645906864eb3f674df8478c5.mockapi.io/api/v1/todolist/2', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name : "công việc 101"
    })
})
}
const handleDelete = async ()=>{

  const response = await fetch('https://645906864eb3f674df8478c5.mockapi.io/api/v1/todolist/3',{
    method : 'DELETE'
  })
}


  const [data , setData] = useState([]);
  useEffect(()=>{
    fetch('https://645906864eb3f674df8478c5.mockapi.io/api/v1/todolist')
    .then(res=>res.json())
    .then(data => {
      setData(data)
    })
  },data)
  return (
    <View style={styles.container}>
       <View style = {styles.title}>
        <Text>TO DO LIST</Text>
       </View>
       <View style={styles.layout}>
  
          <Button title = 'Thêm' onPress = {handle}/>
          <Button title = 'Sửa' onPress = {handleEdit} ></Button>
          <Button  title = 'Xóa' onPress = {handleDelete}></Button>

       </View>

      <View style = {styles.flashlist}> 
      <FlatList 
        data={data}
        renderItem={({item}) => <Item items = {item} />}
        keyExtractor={item => item.id}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical : 50,
    flex: 1,
    backgroundColor: '#fff',
  },
  title : {
    alignItems : 'center'
  },
  layout : {
    marginTop : 50,
    flexDirection : 'row',
    justifyContent : 'space-around',
  
  },
  flashlist : {
    marginTop : 100,
    flex : 2,
    alignItems : 'center'
  },
  todoItem:{
    borderWidth : 1 ,
    borderColor : '#ddd',
    width : 300,
    marginHorizontal : 10,
    marginVertical : 10,
    alignItems : 'center',
    padding : 5
  }

});

import { useEffect, useRef, useState } from "react";
import Modal from 'react-modal';
const Home = () => {
    const [list, setList] = useState(JSON.parse(localStorage.getItem('todoList')) || []);
    const [addInput, setAddInput] = useState('');
    const [editInput, setEditInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState('');
    const [isDarkmode, setIsDarkmode] = useState(false);


    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(list))
    }, [list])

    const addNewListHandler = (e) => {
        e.preventDefault()
        const dataSchema = {
            id: new Date().getTime().toString(),
            content: addInput
        }
        setList([...list, dataSchema]);
        setAddInput('');
    }

    const deleteItem = (id) => {
        setList(
            list.filter((item) => item.id !== id)
        )
    }

    const deleteAllHandler = () => {
        setList([])
    }

    const editListHandler = (item,listIndex) => {
        setIsOpen(true)
        setEditInput(item.content);
        setEditId(item.id)
    }

    const editFormHandler = (e) =>{
        e.preventDefault();
        setList(current =>
            current.map(obj => {
              if (obj.id === editId) {
                return {...obj, content:editInput};
              }
      
              return obj;
            }),
          );

        setEditInput('');
        setIsOpen(false)
    }

    const closeModal = () =>{
        
        setIsOpen(false)
    }
    const customStyles ={
        content: {maxWidth: '420px',
         bottom: 'auto',
         marginLeft: 'auto',
         marginRight: 'auto',
         backgroundColor: '#2d3748'
        }
    }
    const toggleDarkMode = () =>{
        setIsDarkmode( !isDarkmode );
    }
    return (
        <div className={`formWrapper ${isDarkmode && 'darkMode'}`}>
            <div style={{textAlign: 'right'}}>

                <button className="darkModeBtn" onClick={toggleDarkMode}>


                {!isDarkmode ? <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" aria-hidden="true" focusable="false" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path></svg> :

                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" aria-hidden="true" focusable="false" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path></svg>}


                </button>

            </div>
            <h1 className="gText">Todo list</h1>

            <form className="formContainer" onSubmit={addNewListHandler}>
                <div className="formGroup">
                    <input type="text" value={addInput} onChange={(e) => setAddInput(e.target.value)} className="inputBox" placeholder="Enter your task" />
                    <button className="addBtn">Add</button>
                </div>
            </form>

            {list.length > 0 && <div className="listWrapper">
                {list.map((item,index) => <div className="list" key={item.id}>
                    <div className="content">{item.content}</div>
                    <div className="actionWrpr">
                        <button onClick={() => { deleteItem(item.id) }}><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>
                        <button onClick={ ()=>{editListHandler(item, index)} }><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                    </div>
                </div>)}
            </div>}

            {list.length > 0 && <div>
                <button className="deleteAll" onClick={deleteAllHandler}>Delete All</button>
            </div>}



            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                

                <form onSubmit={editFormHandler}>
                    <div className="formGroup">
                        <input type="text" value={editInput} onChange={(e) => setEditInput(e.target.value)} className="inputBox" placeholder="Enter your task" />
                        <button className="addBtn">Save</button>
                    </div>
                </form>

                <div style={{marginTop: '20px', textAlign: 'center'}}>
                <button className="modalCloseBtn" onClick={closeModal}>close</button>
                </div>
                
            </Modal>


        </div>
    )
}

export default Home;
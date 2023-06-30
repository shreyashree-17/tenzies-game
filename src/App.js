import React from 'react';
import './App.css';
import Dice from './dice';
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
    
    React.useEffect(() => {
      // let allHeld = true
      // let allSameValue=true
      // dice.map(die => !die.isHeld? allHeld=false : allHeld)
      // dice.map(die => die.value !==dice[0].value? allSameValue=false : allSameValue)

      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
       
      if (allHeld && allSameValue) {
          setTenzies(true)
          console.log("You won!")
      }
  }, [dice])
  
  
  function generateNewDie(){
    const num= Math.floor(Math.random() *6)+1
    return {
      value:num, 
      isHeld:false,
      id: nanoid()
    }

  }
  
  function allNewDice(){
    const numArray=[]
    for(let i=0; i<10;i++){
      
      numArray.push(generateNewDie())
    }
    return numArray
  }


  function rollDice() {
    if(!tenzies){
      setDice(prevDice=>
      prevDice.map(die=> {
        return die.isHeld? die: generateNewDie()
      }))
    }else{
      setTenzies(false)
      setDice(allNewDice())
    }

  }

  function handleClick(ID){
    setDice(prevdice=> prevdice.map(die=>{
      return die.id===ID?
        {...die, isHeld: !die.isHeld}:
        die
    }))
  }

  const dieElements= dice.map(die=> 
      <Dice 
        value={die.value} 
        isHeld={die.isHeld} 
        handleClick={()=>handleClick(die.id)} 
        key={die.id}
        id= {die.id}
      /> )
  

  return (
    <main className="main">
      {tenzies&&<Confetti/>}
     <div className='text'>
       <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className='dices'>
        {dieElements}
      </div>
      <button onClick={rollDice}>{tenzies? "New Game": "Roll"}</button>
    </main>
  );
}

export default App;

# Redux Toolkit overview w/comments

Small application to practice Redux Toolkit concepts.

## To run application

npm install && npm start

### Topics, steps and process

1. INSTALL REDUX

- In the terminal type 'npm install @reduxjs/toolkit react-redux'

- Libraries that come with this package are redux core, immer to mutate the state, redux-thunk to handle async and reselect to simplify reducer functions.

- Remember, redux can be used with any framework, hence the important of installing react-redux.

- If you don't have it already, go and install redux dev tools extension in your browser.

2. SETUP THE STORE

- Store in redux is essentially the place where you managed your application state. You can have different stores for different parts of your application. It is similar to contextAPI.

- First we need to create an store.js file, import configureStore from the toolkit.

- We are then going to export a variable named store that's initialised with a value equal to the imported configureStore.

- The configureStore from toolkit will take an object and in the object we will have the reducer property whose value will also be an object. Leave empty in the meantime. In here we are going to start setting up the features.

- Depending on how many stores you have, you will import them in different places where you are planning to use them. For a global usage we therefore would need to use it in main index.js file.

- In the file you are planning to use the store it is important to import both the 'store' you just created and 'provider' from redux. This provider is the library that will connect the store to the application. Similar to contextApi we will then wrap our application (or the part of it you are working on) in our Provider. Very similar to contextApi.

- Once you have wrapped your component or app with the Provider imported from redux, you need to pass the store props whose value will be the name of the variable you created in the store.js file and you are importing as mentioned in the previous step.

3. SETTING UP A SLICE

- What's a slice? Think of slice as a feature of your application. Any feature that your application has and is linked to redux, is a slice.
  See: https://redux.js.org/tutorials/essentials/part-2-app-structure

- Convention is to create a features folder to manage this slices. You can use the name slices for this folder, but it wouldn't make much sense and if you have lots it could get confusing. Also because the word slice is also used by convention for the name of the actual feature inside this folder.

- Go ahead and create a new folder 'features'. You can leave it as such or create another folder with the name of the feature and a new file (inside one or the other folder, depending on what you choose) with featureNameSlice.js

- Inside this slice you are going to want to import createSlice from redux and define a variable, normally with the same name as the file, whose value will be initialising the createSlice function. This createSlice function will take a single configuration object with the options name, initialState, reducers, extraReducers. In the meantime we will use name and initialState.
  See: https://redux-toolkit.js.org/api/createslice

- Go ahead and inside createSlice define a name property first, keep in mind this will be the name used for actions types. And also pass your initial state. You can type the initial state there but for readibility is it better to have it outside as a variable and pass it to createSlice. Export the slice. But be mindful you will need to add '.reducer' at the end of it.

- You may wonder, why are we adding that '.reducer' at the end? Well...that slice is an object, with a bunch of properties and methods. We are adding that '.reducer' at the end because we want to export only the reducer property of that object we will be receiving in the store. See the commments in store.js file regarding this.

- So, as you can imagine by now if you did the console log, the reducer in our store will be the actual one in charge of changing the state of our feature. So go ahead and import your slice into the store file. You can see the store has a reducer object inside congifureStore that's waiting for values. The name of our slice is cart in this case, as in the actual name we defined inside the slice to reference that slice. So go ahead and inside our reducer property in the store, initialise cart key with a value of the slice. cartSlice in our case.

- Have a quick look at your reducer dev tools. You are going to see your cart state in there.

4. ACCESS STATE IN COMPONENTS

- So our state is set at this point. Now we need a way to access it in our components. React redux comes with a hook called useSelector. This hook is specifically designed to get data from a redux store. Remember, you can have more than one store so you could be extracting data from different ones. This selecter is somewhat equivalent to mapStateToProps. This hook takes a selector callback function as argument and another optional function.

- In our component file we will import useSelector hook. Inside our component we can then destructure a state property we know is coming from the store and initialised it with useSelector. We are going to pass to the function, inside the parenthesis, our state and return the state.nameOfState we want.

- This happens because when using useSelector and pasing the state as argument, we get access to the whole store. But we only want something particular from that store. So our callback will be taking store and returning the specific property we want from that store. In our case we will pass to our useSelector the state and return state.cart because if you look at our store our reducer has a cart key in there we already passed.

- The order then will be Component calls useSelector -> useSelector gets access to entire store -> we return from the callback the state key from that store -> key is referencing a slice we created -> slice is holding our initial state -> we get access to initialState values.

- So say we want to handle state and what's going to be render in the navbar. We then head to our Navbar component and initialise our useSelector hook. Go and try it. console log 'useSelector((store)=> console.log(store))' and see how you get your whole store in there. Which right now at this point only comprises our cart store. This looks awfully similar to using a custom hook with contextAPI, doesn't it?

- I want the amount from my cart state to shown in my Navbar. So as mentioned before, I can destructure that because I know it is coming from useSelector as we just seen in the console log and pass it as a variable inside my JSX.

5. STRUCTURE WITH MOCK DATA

- For practice purposes there's already a file called cartItems, we are going to use it to mock the behaviour of what it would be fetching data from an API. Once done, we can engage on an actual API.

- You want your initialState in the cart, in cart items, to be this array. So import it into the slice pass it to cartItems as its value.

- What do we want to use in our cartContainer? Well, data coming from our state right? And what have we just done in the Navbar for it? useSelector! So let's go ahead again and import useSelector, initialise it and destructure the things we want from it. In this case, our cartItems array, and the data from this array we will be passing it to our cartItem component, as we do in every normal react application. And some other info such a total and amount because we will manipulate these in the future.

- As you would expect, we need to test functionality by mapping through our array of objects that's coming from the store to make sure everything is ok.

- Now we go ahead and deal with CartItem component which is being mapped in our CartContainer component. Again, this is mostly normal React but we want to structure the component and use the items we are passing as props from CartContainer.

6. START REDUCERS SETUP

- How do we setup reducers with Toolkit? Well, previously we need it actions, dispatch, payload, spread state, return new state and all of that. With Toolkit is much easier (and more similar to contextAPI and useReducer hook).

- Go to your slice. In this case our cartSlice. In you read the link I put, you will see that on top of name and state, our slice object also takes a reducers property. This reducers property will be an object, again, that will have other properties inside. These properties inside reducers are going to be the ones modifying our state.

- You will also notice that this looks very simple. Where is the returned state to avoid unwanted state mutation? Remember in redux/useReducer hook we normally declare an action, send and take payloads, spread the state, then target the ones we want to change and return it. Where is all of that in this property inside our reducers that's inside our slice doing this? Well...is being done by the immer library (that one that comes with toolkit when you install the package as mentioned before). Immer library does majority of that work when it comes to mutating the state and only the state we want.

- Too simple to be truth? Kinda. We still need to export more things and import others and also modify some stuff.

- Head back to your cartSlice. After our initialState property we want to declare a reducers property that as mentioned, value will be an object again. Inside this object, create a key that will be the name of the function you want to call (in this case clearCart) and the value of that key will be a callback modifying our state, such callback will take state as argument and return whatever new state you want.

- If you go now and uncomment the console.log that's there in the file. You will see that this clearCart function is now inside our 'cartSlice.actions' How cool is that? So we still use actions with toolkit, but this action is now defined inside our slice as a function. You will also see the same things as before. Including the reducer we used in a previous step.

- Now, we need to use this somehow yeah. We will use a hook for it that comes with toolkit. In the meantime, we are only exporting the cartSlice.reducer wo why don't we go ahead and export this action too? Create a new export line. Export a const with the destructured value of clearCart that's coming from where? From cartSlice.actions

- Now we need to decide where we are going to use it right? Well...that hook I mentioned, is called useDispatch. It returns a reference to the dispatch function from the redux store. So we will use it to dispatch actions and types as needed. Import it in CartContainer and declare a variable whose value will be invoking useDispatch. We have a button that says clear cart and a reducer called clearCart that mutates the state of cartItems to an empty array. So we need to use that reducer in this button with our dispatch variable we just declared and use it to invoke useDispatch.

- You will also need to import the clearCart from the slice. Head to where the clear cart button is and all we are going to do is add onClick and on button click I will trigger a callback function that will return dispatch(clearCart()).

- And that is all! Easy, right!? You will notice then...we are still technically using actions and payloads and spreading state and all of that. Is just happening behind the scenes in some cases and we don't need to stress much about it every single time, only when needed.

- Recap the order. We are going like such: user click button to clear cart -> upon click I call my dispatch fn included in toolkit -> dispatch function is referencing a reducer function inside my slice -> slice finds the functions inside the reducers property -> reducer knows a mutation needs to happen because we are telling it so -> reducer mutates my cartItems array to empty.

(Now, technically, at this point is worth mentioning that you can indeed return a state or spreaded state as we used to do in normal Redux in your clearCart. It has the same caveats as before such as, if not spread it will replace the whole state object and so on)

7. CONTINUE REDUCERS SETUP W/ACTIONS

- Another functionality we want to have in this case is, say, remove the item. There's a button there to remove the item so let's go ahead and do that.

- Last step was easy, we managed to avoid a bunch of things because Immer was doing most of the job. What happens when we want to manipulate a specific item? Well...we are back to using actions and payloads. Just in a different way than old Redux.

- Go ahead to your cartItems slice and go inside your reducers property. We are going to create a new function. We want to remove items so we would call it removeItems. Same as before we take the state as parameter and this time we will take the action too as second parameter. In the meantime, console log action just to see how it works. And remember to export it destructured next to the clearCart you are already exporting.

- Head back to the cartItem.js because, well...it is here where we want to use this right? We want each item to have this functionality hence why it is its own separate component. Import your removeItem action as you did before in the other file. And obviusly your useDispatch as well. Define dispatch, invoke useDispatch, assign onClick to remove button, pass a callback that will call dispatch(removeItem).

- Now click the button and check your console. You have an object. Toolkit already knows the type, unlike old Redux where you had to define the type. But payload is empty, undefined. Interesting...why? Well, as much as Immer takes care of state mutability, in some cases, specially if we are receiving things and/or interacting with what is rendered in the fontend, we still need our actions. Clearly, there are big differences here. Our actions are already embedded instead of needing another file to be defined, our type is already there and it isn't a list of types that comes with Redux. It is more flexible in other words.

- Go ahead and pass the id (that you probably destructured when you received it as props from the spreaded items in CartContainer) and click the remove button again. Now you will see the payload is our ID! So we want to remove that specific item. What comes next is plain JS. Let's store the action.payload in a variable.Define that state.cartItems (remember this reducers have full access to the state) will equal state.cartItems.filter((item)=>{item.id !== nameOfPayloadVariable})

- So, at this point it is clear that if we are passing data or manipulating the UI, we still need an action. Just handled differently.

8. PRACTICE MORE REDUCERS - INCREASE AND DECREASE

- Well...another thing we need is to increase and decrease the amounts of items when we click the up or down arrows right?

- As you can imagine by now, process is similar.Let's go to our reducers property inside our cartSlice. Define the functions, take our state, take our payload and do some standard JS to modify the amounts. Export it. Import in the place where is needed. Assign onClick with the respective values. Dispatch. I am not going to go over that step by step. It is a practice section.

9. MORE PRACTICE - CALCULATE TOTALS

- Lots of things happening. The last one we need to do before practicing a different thing is handling the totals.

- Guess what we need to do? That's right. Go to cartSlice, go to your reducers property, create another function that will mutate the state. What part of the state? Well...the amount and total.

- Try and do it yourself. But there are a couple different things happening here. We are only mutating the state...why no action? Well...we are not receiving anything from the frontend we need to manipulate. The manipulation is occuring in our other reducers. We are now simply back to mutating the state to show one thing or another.

- What's the other big difference? Well, think about it. Our amount of items is in the Navbar, not in the other components. Do you think the Navbar component is the ideal place to do this? Also, remember our Navbar is already taking the {amount} from our store. Do we need to put in the CartContainer? Well...that's already receiving the {total} from our store. It would make more sense if this is triggered everytime the page is rendered, regardless. So in our case, because it is a test application, we can place it inside the one component that will always be there, our app component. But it needs to be triggered anytime something changes, either the amount of items or the total. How can we do that? Well...what hook triggers on first render and has a dependency that will re-trigger it if such dependency value changes? useEffect.

10. CREATE A MODAL

- Ok, now this is a bit different. We know that models with Redux work differently due to state mutability being different than in React/contextAPI. Let's create a modal component, as standard as you want. And import it and use it into our App.

- This is however easier than with old Redux. We need to follow the steps we have done before. So let's see, first step. This is a new feature, right? So we would need to create a new slice. Remember we said, slices will take care of features. So same as before, inside your features folder, create a new folder called modal then create a new file called modalSlice.

- import createSlice hook from redux toolkit. Create a new initialState with a key that has boolean value, call it as you want.

- define your variable whose value will be our createSlice hook. Inside the createSlice hook function we will have an object. Same as before the object will take name, state and reducers property.

- Inside your reducers property, define two functions to mutate the state. One function will open the modal and change the state to true, the other functions will change the state to false.

- Export your modalSlice.actions as you did before. Export your modalSlice.reducer as you did before. Both coming from the createSlice hook as you have seen already.

- Now that all has been created and exported. Go and import that into the store. Follow the same steps as before. Your reducer property inside the store will now have the cart and your new 'modal: modalSlice' key:value. All the logic for this, already explained in previous steps.

- The modal component is in our app, as we normally do in react. What do we need now? Well, conditionally render the modal is our isOpen state is true. How can we access our store and the state values? As we did before, with the useSelector hook. The difference this time is we will be destructuring the isOpen value from store.modal and not store.cart and this means, as you can imagine, and I think I said it already, for every useSelector and every Reducer in our store we will have full access to the complete state of that slice.

- Now that we have grab the state value of isOpen we can go ahead and conditionally render as we normally do in react our Modal component with a simple AND.

- We have a clear cart button yeah. That right now, at this point, is clearing the cart entirely by making the state an empty array. Why don't we implement this modal in there? Let's do that. The first thing we need is use our openModal action that is inside our modalSlice that's inside our reducers property and we are exporting in there. So let's import that inside the CartContainer and use it. Replace our clearCart action with our openModal one. Now we need to use the clearCart function somewhere else, right? (btw, I have left things commented out so you can follow along)

- We have in our modal a confirm and cancel buttons. Would make sense then to use our clearCart and closeModal inside the confirm button and our closeModal inside our cancel button. Import that inside your modal component and use it in their respective buttons. Remember to also import useDispatch, I explained above why we need it and how we use it.

- That is all! Isn't this WAAAAAY easier than the old redux. And moreover, incredibly similar to useReducer and contextAPI?

11. REDUX TOOLKIT ASYNC W/THUNK

- TODO

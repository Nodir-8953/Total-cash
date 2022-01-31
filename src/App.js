import React from 'react'

class Product extends React.Component{
  constructor(props){
    super(props);
    this.buy = this.buy.bind(this);
    this.show = this.show.bind(this);
    this.state = {qty: 0};
  }

  buy(){
    this.setState({qty: this.state.qty + 1});
    this.props.handleTotal(this.props.price);
  }
  show(){
    this.props.handleShow(this.props.name);
  }
  render(){
    return(
      <div className='wrapper'>
        <p>{this.props.name} - ${this.props.price}</p>
        <button onClick = {this.buy}>Buy</button>
        <button onClick={this.show}>Show</button>
        <h3>Qty: {this.state.qty} item(s).</h3>
        <hr/>
      </div>
    );
  }
}

class Total extends React.Component{
  render(){
    return(
      <div className="wrapper">
        <h3>Total cash: ${this.props.total}</h3>
      </div>
    );
  }
}


class ProductForm extends React.Component{
  constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
  }
  
  submit(e){
    e.preventDefault();
    var product = {
      name: this.refs.name.value,
      price: parseInt(this.refs.price.value) || 0
    }
    if((product.name !=='') && (product.price !==0)){
      this.props.handleCreate(product);
      this.refs.name.value = "";
      this.refs.price.value = "";
    }
    
  }
  render(){
    return(
      <form onSubmit={this.submit} className='wrapper'>
        <input type="text" placeholder="Product Name" ref="name"/> - 
        <input type="text" placeholder="Product Price" ref="price"/> 
        <br/><br/>
        <button>Create product</button>
      </form>
    );
  }
}
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      total: 0,
      productList: [
        {name: "Android", price: 121},
        {name: "Apple", price: 123},
        {name: "Nokia", price: 65}
      ]
    };
    this.calculateTotal = this.calculateTotal.bind(this);
    this.createProduct = this.createProduct.bind(this);  }

  calculateTotal(price){
    this.setState({total: this.state.total + price});
  }
  showProduct(name){
    alert("You selected " + name);
  }
  createProduct(product){
    this.setState({
      productList: this.state.productList.concat(product)
    });
  }
  render(){
    var component = this;
    var products = this.state.productList.map(function(product){
      return (
        <Product name={product.name} price={product.price} handleShow={component.showProduct} handleTotal={component.calculateTotal}/>
      );
    });
    return(
      <div>
        <ProductForm handleCreate = {this.createProduct}/>
        {products}
        <Total total={this.state.total}/>
      </div>
    );
  }
}

export default App;

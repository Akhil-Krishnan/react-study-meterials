import React, { Component } from 'react'

class TransactionForm extends Component {
    state ={
        ...this.returnStateObject()
    }
    //... is spred operator to make the prop of returnStateObject also become to state 
    returnStateObject() {
        if(this.props.currentIdex == -1)
            return {
                accountNo: '',
                ifsc: '',
                name: '',
                amount: ''
            }
        else
            return this.props.list[this.props.currentIdex]
    }

    componentDidUpdate(prevProps){
        if(prevProps.currentIdex != this.props.currentIdex || prevProps.list.length != this.props.list.length)
            this.setState({...this.returnStateObject()})
    }

    handleInputChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.onAddEdit(this.state)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <input name="accountNo" placeholder="Account Number" value={this.state.accountNo} onChange={this.handleInputChange} /><br/>
                    <input name="ifsc" placeholder="IFSC Code" value={this.state.ifsc} onChange={this.handleInputChange} /><br/>
                    <input name="name" placeholder="Account Holder Name" value={this.state.name} onChange={this.handleInputChange} /><br/>
                    <input name="amount" placeholder="Amount" value={this.state.amount} onChange={this.handleInputChange} /><br/>
                    <button type="submit"> submit </button>
                </form>
            </div>
        )
    }
}

export default TransactionForm
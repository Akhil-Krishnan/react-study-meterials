import React, { Component } from 'react'
import TransactionForm from './TransactionForm'

class TransactionList extends Component {
    state = {
        currentIdex: -1,
        list: this.returnList()
    }

    returnList() {
        if(localStorage.getItem('transactions') == null)
            localStorage.setItem('transactions', JSON.stringify([]))
        return JSON.parse(localStorage.getItem('transactions'))
    }

    onAddEdit = (data) =>{
        var list = this.returnList()
        if(this.state.currentIdex == -1)
            list.push(data)
        else
            list[this.state.currentIdex] = data
        localStorage.setItem('transactions', JSON.stringify(list))
        this.setState({list, currentIdex:-1})
    }

    handleEdit = (index) => {
        this.setState({
            currentIdex: index
        })
    }

    handleDelete = (index) => {
        var list = this.returnList()
        list.splice(index, 1)        
        localStorage.setItem('transactions', JSON.stringify(list))
        this.setState({list, currentIdex:-1})
    }

    render() {
        return (
            <div>
                <TransactionForm 
                    onAddEdit = {this.onAddEdit}
                    currentIdex = {this.state.currentIdex}
                    list = {this.state.list}
                />
                <hr />
                <p>Transaction Details</p>
                <br/>
                <table>
                    <tbody>
                        {
                            this.state.list.map((item, index) => {
                                return (
                                    <tr key = {index}>
                                        <td>{item.accountNo}</td>
                                        <td>{item.name}</td>
                                        <td>{item.amount}</td>
                                        <td><button type="button" onClick={() => this.handleEdit(index)}>Edit</button></td>
                                        <td><button type="button" onClick={() => this.handleDelete(index)}>Delete</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default TransactionList
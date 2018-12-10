/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


export default class App extends Component{
	constructor() {
		super()
		this.state = {
			resultText: "",
			calculationText: ""
		}
		this.operations = ['Del', '+', '-', '*', '/']
	}

	calculateResult() {
		const text = this.state.resultText
		console.log(text, eval(text))
		this.setState({
				calculationText: eval(text)
			})s
	}
 	validate() {
		const text = this.state.resultText
		switch(text.slice(-1)) {
			case '+':
			case '-':
			case '*':
			case '/':
				return false
		}
		return true
	}
// calculator logic
	buttonPressed(text) {

		if(text == '='){
			return this.validate() && this.calculateResult()
		}

		this.setState({
			resultText: this.state.resultText+text
			})
	}

	operate(operation) {
		switch(operation) {
			case 'Del':
				let text = this.state.resultText.split('')
				text.pop()
				text.join('')
				this.setState({
						resultText: text.join('')
					})
					break
				case '+':
				case '-':
				case '*':
				case '/':
				// input validation
					const lastChar = this.state.resultText.split('').pop()
					if(this.operations.indexOf(lastChar) > -1) return
					if(this.state.text == "") return
					this.setState({
							resultText: this.state.resultText + operation
						})
		}
	}

  render() {
		// populate buttons with numbers
		let nums = [[1,2,3],[4,5,6],[7,8,9],['.',0,'=']]
		// generate number rows and buttons
		let rows = []
			for (let i = 0; i < 4; i++) {
				let row = []
					for ( let j = 0; j < 3; j++) {
						row.push(<TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}><Text style={styles.buttonText}>{nums[i][j]}</Text></TouchableOpacity>)
					}
					rows.push(<View key={i} style={styles.row}>{row}</View>)
			}
		// populate operations butttons
		let operations = ['Del','+','-','*','/']
		// generate operation buttons
		let ops = []
		for(let i = 0 ; i < operations.length ; i++) {
			ops.push(<TouchableOpacity key={this.operations[i]} onPress={() => this.operate(this.operations[i])} style={styles.btn}>
								<Text style={[styles.buttonText, styles.white]}>{this.operations[i]}</Text>
							</TouchableOpacity>)
		}

    return (
    <View style={styles.container}>
			<View style={styles.result}>
				<Text style={styles.resultText}> {this.state.resultText} </Text>
			</View>
			<View style={styles.calculation}>
				<Text style={styles.calculationText}>{this.state.calculationText}</Text>
			</View>
			<View style={styles.buttons}>
				<View style={styles.numbers}>
					{rows}
				</View>
				<View style={styles.operations}>
					{ops}
				</View>
			</View>
		</View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	result: {
		flex: 2,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	resultText: {
		fontSize: 24,
		color: 'black'
	},
	row: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	calculation: {
		flex: 1,
		backgroundColor: '#f2f2f2',
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	calculationText: {
		fontSize: 20,
		color: '#434343'
	},
	buttons: {
		flexGrow: 7,
		flexDirection: 'row'
	},
	btn: {
		flex: 1,
		alignItems: 'stretch',
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		fontSize: 30,
		color: 'white'
	},
	white: {
		color: 'white'
	},
	numbers: {
		flex: 3,
		backgroundColor: '#434343'
	},
	operations: {
		flex: 1,
		backgroundColor: 'orange',
		justifyContent: 'space-around'
	}
});

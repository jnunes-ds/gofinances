import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';



export function Profile(){

	return (
		<View>
			<Text
				testID='text-title'
			>
					Profile
			</Text>
			<TextInput
				testID='input-name'
				placeholder='First Name'
				autoCorrect={false}
				value='Junior'
			/>
			<TextInput 
				testID='input-surname'
				placeholder='Last Name'
				value='Nunes'
			/>

			<Button 
				title='Save'
				onPress={() => {}}
			/>
		</View>
	);
}
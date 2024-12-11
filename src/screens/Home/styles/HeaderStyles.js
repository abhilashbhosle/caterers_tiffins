import { ScaledSheet } from "react-native-size-matters";
import { ts } from "../../../../ThemeStyles";

export const styles = ScaledSheet.create({
	userimg: {
	  height: '28@ms',
	  width: '28@ms',
	  borderRadius: 50,
	},
	name: {
	  fontFamily: ts.primarymedium,
	  fontWeight: '700',
	},
	topIcons:{
		height:'35@ms',
		width:'35@ms'
	}
  });
  
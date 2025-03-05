import Share from 'react-native-share';

export const shareProfile = ({ vendor_name, vendor_type, profile_id, branch_id }) => {
  const shareMessage = `${vendor_name} (${vendor_type})\nCheck out this profile:\nhttps://www.cateringsandtiffins.com/catering-search/${profile_id}/${branch_id}`;

  Share.open({
    title: vendor_name,
    message: shareMessage,
    subject: 'Profile',
  })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      err && console.log(err);
    });
};

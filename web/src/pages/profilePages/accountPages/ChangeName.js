import React, { useState } from "react";
import { supabase } from "../../../lib/helper/supabaseClient";

const ChangeName = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigation = useNavigation();

  const updateName = async () => {
    let updates = {};

    if (firstName) {
      updates.first_name = firstName;
    }

    if (lastName) {
      updates.last_name = lastName;
    }

    const { data: updateData, error: updateError } =
      await supabase.auth.updateUser({
        data: updates,
      });

    if (updateError) {
      Alert.alert("Error", updateError.message);
      console.error("Error updating name(s)", error);
      return;
    }

    const { data: refreshData, error: refreshError } =
      await supabase.auth.refreshSession();

    if (refreshError) {
      Alert.alert("Error", refreshError.message);
      console.error("Error refreshing token", refreshError);
      return;
    }

    await AsyncStorage.setItem(
      "userToken",
      JSON.stringify(refreshData.session)
    );

    console.log("Name updated successfully");
    alert("Success", "Name updated", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <div>
      <form onSubmit={updatePassword}>
        <input
          type="text"
          id="firstName"
          value={firstName}
          placeholder="firstName"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          id="LastName"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ChangeName;

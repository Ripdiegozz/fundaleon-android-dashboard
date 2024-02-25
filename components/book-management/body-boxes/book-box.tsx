import React, { useEffect, useState } from "react";
import { Text, Box} from "@gluestack-ui/themed";
import { makeRequest } from "../../../lib/axios";

export const BookBox = () => {
  const [books, setBooks] = useState(0);

  useEffect(() => {
    const getBooks = async () => {
      const { data } = await makeRequest.get("/book/get/all/count");
      setBooks(data.data);
    };

    getBooks();
  }, [books]);

  return (
    <Box
      width="$full"
      paddingBottom="$4"
      bgColor="$white"
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      padding="$4"
      borderRadius="$lg"
    >
      <Box
        display="flex"
        width="$full"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          fontSize="$3xl"
          paddingTop="$4"
          paddingLeft="$2"
          paddingRight="$4"
          fontWeight="$regular"
          textAlign="center"
        >
          {books}
        </Text>
        <Box>
          <Box
            display="flex"
            flexDirection="row"
            rowGap="$1"
            alignItems="center"
          >
            <Text fontSize="$lg" fontWeight="$medium">
              Títulos registrados
            </Text>
            {/* <Badge size="md" variant="solid" borderRadius="$none" action="success" marginLeft="$2">
                <BadgeText fontSize='$md' fontWeight='$regular'>
                  <Icon as={ChevronUpIcon} size='md' color='$green' marginLeft='$2' />
                  TODO
                </BadgeText>
              </Badge> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

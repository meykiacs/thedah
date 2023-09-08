import { Box, Image, Text, List, ListItem } from "@chakra-ui/react";

const BookList = ({ books }) => {
  return (
    <List spacing={3}>
      {books.map((book) => (
        <ListItem key={book.isbn}>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={book.image} alt={book.title} />

            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Text
                  mt="2"
                  fontWeight="semibold"
                  lineHeight="tight"
                  isTruncated
                >
                  {book.title}
                </Text>
              </Box>

              <Box>
                {book.description}
                <br />
                ISBN: {book.isbn}
                <br />
                Edition: {book.edition}
                <br />
                Price: {book.price}
                <br />
                Pages: {book.pages}
                <br />
                Publisher Name: {book.publisherName}
                <br />
                Author: {book.author}
                <br />
                Co-Authors: {book.coAuthors.join(', ')}
                <br />
                Year: {book.year}
                <br />
                Availability: {book.availability ? 'Available' : 'Not Available'}
              </Box>
            </Box>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default BookList;

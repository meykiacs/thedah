import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"
import { useTranslation } from "react-i18next"

export const SearchResults = () => {
  const { posts, searchQuery } = useWPContext()
  const { t } = useTranslation()
  return (
    <div>
      {posts.length > 0 ? (
        <P>
          {t("ResultsFor")} `{searchQuery}`:
        </P>
      ) : (
        <P>{t('NoResultsFoundFor')} `{searchQuery}`.</P>
      )}
      <PostList>
        {posts.map((post) => (
          <PostListItem key={post.id}>
            <PostLink href={post.permalink}>{post.title}</PostLink>
          </PostListItem>
        ))}
      </PostList>
    </div>
  )
}

const PostList = styled.ul``

const P = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
`

const PostListItem = styled.li`
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid ${(p) => p.theme.colors.grayMiddle};

  &:last-child {
    border-bottom: none;
  }
`

const PostLink = styled.a`
  color: ${(p) => p.theme.colors.text};
  text-decoration: none;
  font-size: 2rem;
  font-weight: 500;

  &:hover {
    color: ${(p) => p.theme.colors.primary};
  }
`

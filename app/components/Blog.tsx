import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';

type BlogProps = {
  blogs: {
    id: string;
    url: string;
    title: string;
    page_views_count: number;
    description: string;
    tag_list: string[];
  }[];
};

const Blog = ({ blogs }: BlogProps) => {};

export default Blog;

import { INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { isJPG, isImage, isVideo } from '~/assets/scripts/helpers';

const options = {
  renderNode: {
    [INLINES.HYPERLINK]: ({ data, content }, next) => {
      // Set target="_blank" if link http/s
      const targetBlank = data.uri.startsWith('http') ? 'target="_blank"' : '';
      return `<a ${targetBlank} href="${data.uri}">${next(content)}</a>`;
    }
  }
};

export default {
  methods: {
    render: item => documentToHtmlString(item, options),
    isH1: item => item.nodeType === 'heading-1',
    isH2: item => item.nodeType === 'heading-2',
    isH3: item => item.nodeType === 'heading-3',
    isH4: item => item.nodeType === 'heading-4',
    isH5: item => item.nodeType === 'heading-5',
    isH6: item => item.nodeType === 'heading-6',
    isText: item => item.nodeType === 'paragraph',
    isQuote: item => item.nodeType === 'blockquote',
    isOL: item => item.nodeType === 'ordered-list',
    isUL: item => item.nodeType === 'unordered-list',
    isHR: item => item.nodeType === 'hr',
    isJPG: item =>
      item.nodeType === 'embedded-asset-block' && isJPG(item.data.target),
    isImage: item =>
      item.nodeType === 'embedded-asset-block' && isImage(item.data.target),
    isVideo: item =>
      item.nodeType === 'embedded-asset-block' && isVideo(item.data.target)
  }
};

import React, { useState } from 'react';
import Link from 'next/link';
import { Post } from '@prisma/client';
import type { NextPage, GetServerSideProps } from 'next';
import AdminProtected from '@/components/common/AdminProtected';
import ColorPicker from '@/components/common/ColorPicker';
import Layout from '@/components/pageComponents/Layout';
import { useIntl, FormattedMessage } from 'react-intl';
import { serializeDate, updatePost } from '@/utils/apiFunctions';
import { getPostByIdDB } from '@/utils/dbFunctions';
import { validateWithRules } from '@/utils/validationFunctions';
import { updatePostRules } from '@/validation/postRules';
import { toast } from 'react-toastify';

import { Color, PageMeta } from '@/types';

type Props = {
  initialPost: Post;
};
const PostPage: NextPage<Props> = ({ initialPost }) => {
  const [formData, setFormData] = useState(initialPost);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const { formatMessage } = useIntl();

  const pageMeta: PageMeta = {
    title: 'Post Detail',
    metadesc: 'Edit this post.',
  };
  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (e.target.name === 'active') {
      setFormData((prev) => ({
        ...prev,
        active: e.target.value === 't',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const openColorPicker = () => {
    setIsColorPickerOpen(true);
  };
  const closeColorPicker = () => {
    setIsColorPickerOpen(false);
  };
  const selectNewColor = (c: Color) => {
    closeColorPicker();
    setFormData((prev) => ({
      ...prev,
      colorR: c.r,
      colorG: c.g,
      colorB: c.b,
    }));
  };
  const saveForm = async () => {
    const success = await updatePost(initialPost.id, formData);
    if (success) {
      toast.info(formatMessage({ id: 'admin__posts__edit__save__success' }));
    } else {
      toast.error(formatMessage({ id: 'admin__posts__edit__save__error' }));
    }
  };
  // TODO: add imgFeatured, imgThumbnail
  // For now, only one content type exists, news, so we do not need to edit type just yet.
  const isValid = validateWithRules(formData, updatePostRules);
  return (
    <Layout pageMeta={pageMeta}>
      <AdminProtected>
        <div id="post-detail" className="pt-2 pb-6 contained">
          <h1>Post: {formData.title}</h1>
          {/* Fields go here. */}
          {/* <div>{JSON.stringify(formData)}</div> */}
          <div className="grid py-1">
            <div className="grid-row grid-row-2 pb-2">
              <div>
                <label>
                  <span>
                    <FormattedMessage id="admin__posts__edit__title" />
                  </span>
                  <input
                    type="text"
                    value={formData.title}
                    name="title"
                    data-testid="form-data-title"
                    onChange={handleFormChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  <span>
                    <FormattedMessage id="admin__posts__edit__slug" />
                  </span>
                  <input
                    type="text"
                    value={formData.slug}
                    name="slug"
                    onChange={handleFormChange}
                  />
                </label>
              </div>
            </div>

            <div className="grid-row grid-row-2 pb-2">
              <div>
                <label>
                  <span>
                    <FormattedMessage id="admin__posts__edit__minLevel" />
                  </span>
                  <input
                    type="number"
                    value={formData.minLevel}
                    name="minLevel"
                    onChange={handleFormChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  <span>
                    <FormattedMessage id="admin__posts__edit__active" />
                  </span>
                  <select
                    className="select"
                    name="active"
                    value={formData.active ? 't' : 'f'}
                    onChange={handleFormChange}
                    data-testid="form-data-active"
                  >
                    <option value="t">Active</option>
                    <option value="f">Not Active</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="grid-row grid-row-2 pb-2">
              <div>
                <label>
                  <span>
                    <FormattedMessage id="admin__posts__edit__pubDate" />
                  </span>
                  <input
                    type="date"
                    //@ts-ignore
                    value={formData.publishDate}
                    name="publishDate"
                    onChange={handleFormChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  <span>
                    <FormattedMessage id="admin__posts__edit__postColor" />
                  </span>
                  <button
                    onClick={openColorPicker}
                    data-testid="form-data-color"
                    aria-label="change color"
                  >
                    <div
                      className="w-3 h-3 round"
                      style={{
                        backgroundColor: `rgb(${formData.colorR}, ${formData.colorG}, ${formData.colorB})`,
                      }}
                    />
                  </button>
                </label>
              </div>
            </div>

            <div className="grid-row grid-row-2 pb-2">
              <div>
                <label>
                  <span>
                    <FormattedMessage id="admin__posts__edit__tags" />
                  </span>
                  <input
                    type="text"
                    value={formData.tags}
                    name="tags"
                    onChange={handleFormChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  <span>
                    <FormattedMessage id="admin__posts__edit__metadesc" />
                  </span>
                  <input
                    type="text"
                    value={formData.metadesc}
                    name="metadesc"
                    onChange={handleFormChange}
                  />
                </label>
              </div>
            </div>

            <div className="grid-row grid-row-2 pb-2">
              <div>
                <label>
                  <span>
                    <FormattedMessage id="admin__posts__edit__imgFeatured" />
                  </span>
                  <input
                    type="text"
                    value={formData.imgFeatured}
                    name="imgFeatured"
                    onChange={handleFormChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  <span>
                    <FormattedMessage id="admin__posts__edit__imgThumbnail" />
                  </span>
                  <input
                    type="text"
                    value={formData.imgThumbnail}
                    name="imgThumbnail"
                    onChange={handleFormChange}
                  />
                </label>
              </div>
            </div>

            <div className="">
              <label>
                <span>
                  <FormattedMessage id="admin__posts__edit__content" />
                </span>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleFormChange}
                  rows={20}
                />
              </label>
            </div>
          </div>
          <ColorPicker
            color={{ r: formData.colorR, g: formData.colorG, b: formData.colorB }}
            isOpen={isColorPickerOpen}
            closeColorPicker={closeColorPicker}
            onChange={selectNewColor}
          />
          <div className="flex justify-right">
            <Link className="btn" href="/admin/posts">
              <FormattedMessage id="btn_cancel" />
            </Link>
            {isValid && (
              <button
                className="btn hover-zoom ml-1"
                onClick={saveForm}
                data-testid="btn-form-save"
              >
                <FormattedMessage id="btn_ok" />
              </button>
            )}
          </div>
        </div>
      </AdminProtected>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const postData = await getPostByIdDB(`${id}`);
  const { post } = postData;
  return {
    props: {
      initialPost: {
        ...post,
        createdAt: post?.createdAt ? serializeDate(post?.createdAt) : null,
        modifiedAt: post?.modifiedAt ? serializeDate(post?.modifiedAt) : null,
      },
    },
  };
};

export default PostPage;

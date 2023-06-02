class Comment < ApplicationRecord
    validates :body, presence: true

    belongs_to :user,
        foreign_key: :author_id,
        class_name: :User

    belongs_to :post,
        foreign_key: :post_id,
        class_name: :Post
end

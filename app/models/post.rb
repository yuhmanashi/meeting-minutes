class Post < ApplicationRecord
    validates :body, presence: true

    belongs_to :user,
        foreign_key: :author_id,
        class_name: :User
    
    has_many :comments,
        foreign_key: :comment_id,
        class_name: :Comment
end
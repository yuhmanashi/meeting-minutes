class Pin < ApplicationRecord
    validates :title, :body, presence: true

    belongs_to :user,
        foreign_key: :author_id,
        class_name: :User
end
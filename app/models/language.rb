class Language < ApplicationRecord
  has_and_belongs_to_many :guides
end
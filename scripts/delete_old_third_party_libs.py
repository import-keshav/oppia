# Copyright 2014 The Oppia Authors. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS-IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

""" Scripts that deletes old third party libs. """

import os
import shutil


THIRD_PARTY_DIR = os.path.join('.', 'third_party')

def remove_beautiful_soup():
    """ Finds libraries in third party folder and deletes old version of
    beautiful soup.
    """
    libraries = os.listdir(THIRD_PARTY_DIR)
    if 'beautifulsoup4-4.6.0' in libraries:
        shutil.rmtree(THIRD_PARTY_DIR + '/beautifulsoup4-4.6.0',
                      ignore_errors=False, onerror=None)
        return
    return


if __name__ == '__main__':
    remove_beautiful_soup()
